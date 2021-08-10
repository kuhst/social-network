import { usersAPI } from "../api/api";
import { objectsHelper } from "../utils/objectsHelper";

const FOLLOW = 'user_FOLLOW';
const UNFOLLOW = 'user_UNFOLLOW';
const SET_USERS = 'user_SET_USERS';
const SET_PAGE_NUMBER = 'user_SET_PAGE_NUMBER';
const SET_USERS_COUNT = 'user_SET_USERS_COUNT';
const SET_FETCHING = 'user_SET_FETCHING';
const TOGGLE_IS_FOLLOWING = 'user_TOGGLE_IS_FOLLOWING';

let initialState = {
	users: [],
	usersCount: 0,
	usersCountOnPage: 12,
	currentPage: 1,
	isFetching: false,
	isFollowing: []
}

const usersReducer = (state = initialState, action) => {
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
				isFetching: action.fetching,
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

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setPageToCurrent = (pageNumber) => ({ type: SET_PAGE_NUMBER, pageNumber });
export const setUsersCount = (usersCount) => ({ type: SET_USERS_COUNT, usersCount });
export const setFetching = (fetching) => ({ type: SET_FETCHING, fetching });
export const toggleIsFollowing = (isFollowing, userId) => ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId });

export const responseUsers = (usersCountOnPage, currentPage) => {
	return async (dispatch) => {
		dispatch(setFetching(true));
		dispatch(setPageToCurrent(currentPage));

		const response = await usersAPI.getUsers(usersCountOnPage, currentPage);

		dispatch(setFetching(false));
		dispatch(setUsers(response.items));
		dispatch(setUsersCount(response.totalCount));
	}
};

const followUnfollow = async (userID, dispatch, apiMethod, actionCreator) => {
	dispatch(toggleIsFollowing(true, userID));

	const response = await apiMethod(userID);

	if (response.resultCode === 0) {
		dispatch(actionCreator(userID))
	};
	dispatch(toggleIsFollowing(false, userID));
}

export const unfollow = (userID) => {
	return async (dispatch) => {
		followUnfollow(userID, dispatch, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
	}
};

export const follow = (userID) => {
	return async (dispatch) => {
		followUnfollow(userID, dispatch, usersAPI.follow.bind(usersAPI), followSuccess)
	}
};

export default usersReducer;