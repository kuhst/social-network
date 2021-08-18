import { BaseThunkType, InferActionsTypes } from './ReduxStore';
import { Dispatch } from "redux";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../type/type";
import { objectsHelper } from "../utils/objectsHelper";

let initialState = {
	users: [] as Array<UserType>,
	usersCount: 0,
	usersCountOnPage: 12,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				users: objectsHelper(state.users, action.userId, "id", { followed: true }),
			}
		case 'UNFOLLOW':
			return {
				...state,
				users: objectsHelper(state.users, action.userId, "id", { followed: false }),
			}
		case 'SET_USERS':
			return {
				...state,
				users: action.users,
			}
		case 'SET_PAGE_NUMBER':
			return {
				...state,
				currentPage: action.pageNumber,
			}
		case 'SET_USERS_COUNT':
			return {
				...state,
				usersCount: action.usersCount,
			}
		case 'SET_FETCHING':
			return {
				...state,
				isFetching: action.isFetching,
			}
		case 'TOGGLE_IS_FOLLOWING':
			return {
				...state,
				followingInProgress: action.isFollowing
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}
		default: return state;
	};
};


const actionsUsersReducer = {
	followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
	unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
	setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
	setPageToCurrent: (pageNumber: number) => ({ type: 'SET_PAGE_NUMBER', pageNumber } as const),
	setUsersCount: (usersCount: number) => ({ type: 'SET_USERS_COUNT', usersCount } as const),
	setFetching: (isFetching: boolean) => ({ type: 'SET_FETCHING', isFetching } as const),
	toggleIsFollowing: (isFollowing: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING', isFollowing, userId } as const),
}

export const responseUsers = (usersCountOnPage: number, currentPage: number): ThunkType => {
	return async (dispatch) => {
		dispatch(actionsUsersReducer.setFetching(true));
		dispatch(actionsUsersReducer.setPageToCurrent(currentPage));

		const response = await usersAPI.getUsers(usersCountOnPage, currentPage);

		dispatch(actionsUsersReducer.setFetching(false));
		dispatch(actionsUsersReducer.setUsers(response.items));
		dispatch(actionsUsersReducer.setUsersCount(response.totalCount));
	}
};

const _followUnfollow = async (userID: number, dispatch: DispatchType, apiMethod: any,
	actionCreator: (userId: number) => ActionsType) => {
	dispatch(actionsUsersReducer.toggleIsFollowing(true, userID));

	const response = await apiMethod(userID);

	if (response.resultCode === 0) {
		dispatch(actionCreator(userID))
	};
	dispatch(actionsUsersReducer.toggleIsFollowing(false, userID));
}

export const unfollow = (userID: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollow(userID, dispatch, usersAPI.unfollow.bind(usersAPI), actionsUsersReducer.unfollowSuccess)
	}
};

export const follow = (userID: number): ThunkType => {
	return async (dispatch) => {
		_followUnfollow(userID, dispatch, usersAPI.follow.bind(usersAPI), actionsUsersReducer.followSuccess)
	}
};

export default usersReducer;


type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsUsersReducer>
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>