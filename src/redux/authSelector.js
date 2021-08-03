export const getIsAuth = (state) => {
	return state.auth.isAuth;
}

export const getUserId = (state) => {
	return state.auth.userId;
}

export const getLogin = (state) => {
	return state.auth.login;
}

export const getStatus = (state) => {
	return state.auth.status;
}

export const getLoadingStatus = (state) => {
	return state.auth.isLoading;
}