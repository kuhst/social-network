import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";
import { PhotosType, ProfileType } from "../type/type";

const USER_AUTH = 'auth_USER_AUTH';
const SET_STATUS = 'auth_GET_STATUS';
const USER_PROFILE = 'auth_USER_PROFILE';
const SET_LOADING = 'auth_SET_LOADING';
const SET_USER_PHOTO_SUCCESS = 'auth_SET_USER_PHOTO_SUCCESS';
const SET_CAPTCHA_URL = 'auth_SET_CAPTCHA_URL';

type InitialStateType = {
	userId: string | null
	login: string | null
	email: string | null
	captchaURL: string | null
	isAuth: boolean | false
	isLoading: boolean | false
	status: string | null
	profile: ProfileType
}

let initialState: InitialStateType = {
	userId: null,
	login: null,
	email: null,
	captchaURL: null,
	isAuth: false,
	isLoading: false,
	status: null,
	profile: {
		aboutMe: null,
		lookingForAJob: null,
		lookingForAJobDescription: null,
		fullName: null,
		userId: null,
		photos: {
			small: null,
			large: null
		},
		contacts: {
			facebook: null,
			website: null,
			vk: null,
			twitter: null,
			instagram: null,
			youtube: null,
			github: null,
			mainLink: null
		},
	}
}

const authReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case USER_AUTH:
			return {
				...state,
				...action.data,
			}
		case SET_CAPTCHA_URL:
			return {
				...state,
				captchaURL: action.captchaURL,
			}
		case USER_PROFILE:
			return {
				...state,
				profile: action.profile,
			}
		case SET_STATUS:
			return {
				...state,
				status: action.status,
			}
		case SET_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			}
		case SET_USER_PHOTO_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			}
		default: return state;
	};
};

type SetAuthUserDataActionType = {
	type: typeof USER_AUTH
	data: AuthDataType
}
type AuthDataType = {
	userId: number | null
	login: string | null
	email: string | null
	isAuth: boolean
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: USER_AUTH, data: { userId, login, email, isAuth } });
type SetMiStatusActionType = {
	type: typeof SET_STATUS
	status: string
}
export const setMiStatus = (status: string): SetMiStatusActionType => ({ type: SET_STATUS, status });
type SetMiProfileActionType = {
	type: typeof USER_PROFILE
	profile: ProfileType
}
export const setMiProfile = (profile: ProfileType): SetMiProfileActionType => ({ type: USER_PROFILE, profile });
type SetLoadingActionType = {
	type: typeof SET_LOADING
	isLoading: boolean
}
export const setLoading = (isLoading: boolean): SetLoadingActionType => ({ type: SET_LOADING, isLoading });
type SetUserPhotoSuccessActionType = {
	type: typeof SET_USER_PHOTO_SUCCESS
	photos: PhotosType
}
export const setUserPhotoSuccess = (photos: PhotosType): SetUserPhotoSuccessActionType => ({ type: SET_USER_PHOTO_SUCCESS, photos });
type SetCaptchaURLsActionType = {
	type: typeof SET_CAPTCHA_URL
	captchaURL: string | null
}
export const setCaptchaURL = (captchaURL: string | null): SetCaptchaURLsActionType => ({ type: SET_CAPTCHA_URL, captchaURL });

export const getAuth = () => {
	return async (dispatch: any) => {
		dispatch(setCaptchaURL(null))
		const response = await authAPI.getAuth();

		if (response.resultCode !== 0) return;
		let { id, login, email } = response.data;
		dispatch(setAuthUserData(id, login, email, true));

		const userData = await profileAPI.getUser(id);

		dispatch(setMiProfile(userData));

		const userStatus = await profileAPI.getStatus(userData.userId);

		dispatch(setMiStatus(userStatus))

	}
}

export const setStatus = (status: string) => {
	return async (dispatch: any) => {
		dispatch(setLoading(true));

		const response = await profileAPI.setStatus(status);

		dispatch(setLoading(false))
		if (response.data.resultCode !== 0) return;
		dispatch(setMiStatus(status))
	}
}

export const logIn = (email: string, password: string, rememberMe: boolean, captchaCode: number) => {
	return async (dispatch: any) => {
		const response = await authAPI.logIn(email, password, rememberMe, captchaCode)

		if (response.resultCode === 0) {
			dispatch(getAuth())
		} else {
			if (response.resultCode === 10) {
				const captcha = await authAPI.getCaptcha()
				dispatch(setCaptchaURL(captcha.url))
			}
			let action = stopSubmit('login', { _error: response.messages });
			dispatch(action)
		}
	}
}

export const logOut = () => {
	return async (dispatch: any) => {
		const response = await authAPI.logOut()

		if (response.resultCode !== 0) return;
		dispatch(setAuthUserData(null, null, null, false))

	}
}

export const setUserPhoto = (file: any) => {
	return async (dispatch: any) => {
		const response = await profileAPI.setPhoto(file);

		if (response.data.resultCode === 0) return;
		dispatch(setUserPhotoSuccess(response.data.data.photos));

	}
}


export default authReducer;