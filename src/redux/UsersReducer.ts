import { AppStateType } from './ReduxStore';
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { UserType } from "../type/type";
import { objectsHelper } from "../utils/objectsHelper";

const FOLLOW = 'user_FOLLOW';
const UNFOLLOW = 'user_UNFOLLOW';
const SET_USERS = 'user_SET_USERS';
const SET_PAGE_NUMBER = 'user_SET_PAGE_NUMBER';
const SET_USERS_COUNT = 'user_SET_USERS_COUNT';
const SET_FETCHING = 'user_SET_FETCHING';
const TOGGLE_IS_FOLLOWING = 'user_TOGGLE_IS_FOLLOWING';

type InitialStateType = {
	users: Array<UserType>
	usersCount: number
	usersCountOnPage: number
	currentPage: number
	isFetching: boolean,
	isFollowing: Array<number>
}

let initialState: InitialStateType = {
	users: [],
	usersCount: 0,
	usersCountOnPage: 12,
	currentPage: 1,
	isFetching: false,
	isFollowing: []
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: objectsHelper(state.users, action.userId, "id", { followed: true }),
			}
		case UNFOLLOW:
			return {
				...state,
				users: objectsHelper(state.users, action.userId, "id", { followed: false }),
			}
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case SET_PAGE_NUMBER:
			return {
				...state,
				currentPage: action.pageNumber,
			}
		case SET_USERS_COUNT:
			return {
				...state,
				usersCount: action.usersCount,
			}
		case SET_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			}
		case TOGGLE_IS_FOLLOWING:
			return {
				...state,
				isFollowing: action.isFollowing
					? [...state.isFollowing, action.userId]
					: state.isFollowing.filter(id => id !== action.userId)
			}
		default: return state;
	};
};

type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
	SetPageToCurrentActionType | SetUsersCountActionType | SetFetchingActionType | ToggleIsFollowingActionType

type FollowSuccessActionType = {
	type: typeof FOLLOW
	userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });
type UnfollowSuccessActionType = {
	type: typeof UNFOLLOW
	userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });
type SetUsersActionType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
type SetPageToCurrentActionType = {
	type: typeof SET_PAGE_NUMBER
	pageNumber: number
}
export const setPageToCurrent = (pageNumber: number): SetPageToCurrentActionType => ({ type: SET_PAGE_NUMBER, pageNumber });
type SetUsersCountActionType = {
	type: typeof SET_USERS_COUNT
	usersCount: number
}
export const setUsersCount = (usersCount: number): SetUsersCountActionType => ({ type: SET_USERS_COUNT, usersCount });
type SetFetchingActionType = {
	type: typeof SET_FETCHING
	isFetching: boolean
}
export const setFetching = (isFetching: boolean): SetFetchingActionType => ({ type: SET_FETCHING, isFetching });
type ToggleIsFollowingActionType = {
	type: typeof TOGGLE_IS_FOLLOWING
	isFollowing: boolean
	userId: number
}
export const toggleIsFollowing = (isFollowing: boolean, userId: number): ToggleIsFollowingActionType => ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId });

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const responseUsers = (usersCountOnPage: number, currentPage: number): ThunkType => {
	return async (dispatch) => {
		dispatch(setFetching(true));
		dispatch(setPageToCurrent(currentPage));

		const response = await usersAPI.getUsers(usersCountOnPage, currentPage);

		dispatch(setFetching(false));
		dispatch(setUsers(response.items));
		dispatch(setUsersCount(response.totalCount));
	}
};

const _followUnfollow = async (userID: number, dispatch: DispatchType, apiMethod: any,
	actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
	dispatch(toggleIsFollowing(true, userID));

	const response = await apiMethod(userID);

	if (response.resultCode === 0) {
		dispatch(actionCreator(userID))
	};
	dispatch(toggleIsFollowing(false, userID));
}

export const unfollow = (userID: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollow(userID, dispatch, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
	}
};

export const follow = (userID: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollow(userID, dispatch, usersAPI.follow.bind(usersAPI), followSuccess)
	}
};

export default usersReducer;