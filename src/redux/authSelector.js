export const getIsAuth = (state) => {
	return state.auth.isAuth;
}

export const getCaptchaURL = (state) => {
	return state.auth.captchaURL;
}

export const getMiId = (state) => {
	return state.auth.userId;
}

export const getMiLogin = (state) => {
	return state.auth.login;
}

export const getMiStatus = (state) => {
	return state.auth.status;
}

export const getMiProfile = (state) => {
	return state.auth.profile;
}

export const getMiPhotoSmall = (state) => {
	return state.auth.profile.photos.small;
}

export const getMiPhotoLarge = (state) => {
	return state.auth.profile.photos.large;
}

export const getLoadingStatus = (state) => {
	return state.auth.isLoading;
}