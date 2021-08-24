import { AppStateType } from "./ReduxStore";

export const getUsers = (state: AppStateType) => {
	return state.usersPage.users;
}

export const getUsersCount = (state: AppStateType) => {
	return state.usersPage.usersCount;
}

export const getUsersCountOnPage = (state: AppStateType) => {
	return state.usersPage.usersCountOnPage;
}

export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
}

export const getUserFilter = (state: AppStateType) => {
	return state.usersPage.filter;
}