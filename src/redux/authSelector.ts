import { AppStateType } from "./ReduxStore";

export const getIsAuth = (state: AppStateType) => {
	return state.auth.isAuth;
}

export const getCaptchaURL = (state: AppStateType) => {
	return state.auth.captchaURL;
}

export const getMiId = (state: AppStateType) => {
	return state.auth.userId;
}

export const getMiLogin = (state: AppStateType) => {
	return state.auth.login;
}

export const getMiStatus = (state: AppStateType) => {
	return state.auth.status;
}

export const getMiProfile = (state: AppStateType) => {
	return state.auth.profile;
}

export const getMiPhotoSmall = (state: AppStateType) => {
	return state.auth.profile.photos.small;
}

export const getMiPhotoLarge = (state: AppStateType) => {
	return state.auth.profile.photos.large;
}

export const getLoadingStatus = (state: AppStateType) => {
	return state.auth.isLoading;
}