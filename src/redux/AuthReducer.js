import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const USER_AUTH = 'auth_USER_AUTH';
const SET_STATUS = 'auth_GET_STATUS';
const USER_DATA = 'auth_USER_DATA';
const SET_LOADING = 'auth_SET_LOADING';
const SET_USER_PHOTO_SUCCESS = 'auth_SET_USER_PHOTO_SUCCESS';
const SET_CAPTCHA_URL = 'auth_SET_CAPTCHA_URL';

let initialState = {
	userId: null,
	login: null,
	email: null,
	captchaURL: null,
	isAuth: false,
	isLoading: false,
	status: null,
	profile: {
		photos: {},
		contacts: {},
	}
}

const authReducer = (state = initialState, action) => {
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
		case USER_DATA:
			return {
				...state,
				profile: action.data.data,
			}
		case SET_STATUS:
			return {
				...state,
				status: action.status,
			}
		case SET_LOADING:
			return {
				...state,
				isLoading: action.loading,
			}
		case SET_USER_PHOTO_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			}
		default: return state;
	};
};


export const setAuthUserData = (userId, login, email, isAuth) => ({ type: USER_AUTH, data: { userId, login, email, isAuth } });
export const setMiStatus = (status) => ({ type: SET_STATUS, status });
export const setMiData = (data) => ({ type: USER_DATA, data: { data } });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setUserPhotoSuccess = (photos) => ({ type: SET_USER_PHOTO_SUCCESS, photos });
export const setCaptchaURL = (captchaURL) => ({ type: SET_CAPTCHA_URL, captchaURL });

export const getAuth = () => {
	return async (dispatch) => {
		dispatch(setCaptchaURL(null))
		const response = await authAPI.getAuth();

		if (response.resultCode !== 0) return;
		let { id, login, email } = response.data;
		dispatch(setAuthUserData(id, login, email, true));

		const userData = await profileAPI.getUser(id);

		dispatch(setMiData(userData));

		const userStatus = await profileAPI.getStatus(userData.userId);

		dispatch(setMiStatus(userStatus))

	}
}

export const setStatus = (status) => {
	return async (dispatch) => {
		dispatch(setLoading(true));

		const response = await profileAPI.setStatus(status);

		dispatch(setLoading(false))
		if (response.data.resultCode !== 0) return;
		dispatch(setMiStatus(status))
	}
}

export const logIn = (email, password, rememberMe, captchaCode) => {
	return async (dispatch) => {
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
	return async (dispatch) => {
		const response = await authAPI.logOut()

		if (response.resultCode !== 0) return;
		dispatch(setAuthUserData(null, null, null, false))

	}
}

export const setUserPhoto = (file) => {
	return async (dispatch) => {
		const response = await profileAPI.setPhoto(file);

		if (response.data.resultCode === 0) return;
		dispatch(setUserPhotoSuccess(response.data.data.photos));

	}
}


export default authReducer;