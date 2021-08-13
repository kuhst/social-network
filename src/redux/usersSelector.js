export const getUsers = (state) => {
	return state.usersPage.users;
}

export const getUsersCount = (state) => {
	return state.usersPage.usersCount;
}

export const getUsersCountOnPage = (state) => {
	return state.usersPage.usersCountOnPage;
}

export const getCurrentPage = (state) => {
	return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress;
}

// export const getUsers = (state) => {
// 	return state.usersPage.users;
// }

// export const getUsers = (state) => {
// 	return state.usersPage.users;
// }