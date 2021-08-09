import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const USER_AUTH = 'auth_USER_AUTH';
const SET_STATUS = 'auth_GET_STATUS';
const USER_DATA = 'auth_USER_DATA';
const SET_LOADING = 'auth_SET_LOADING';
const SET_USER_PHOTO_SUCCESS = 'auth_SET_USER_PHOTO_SUCCESS';

let initialState = {
	userId: null,
	login: null,
	email: null,
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
export const setUserStatus = (status) => ({ type: SET_STATUS, status });
export const setUserData = (data) => ({ type: USER_DATA, data: { data } });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setUserPhotoSuccess = (photos) => ({ type: SET_USER_PHOTO_SUCCESS, photos });

export const getAuth = () => {
	return async (dispatch) => {
		const response = await authAPI.getAuth();

		if (response.resultCode !== 0) return;
		let { id, login, email } = response.data;
		dispatch(setAuthUserData(id, login, email, true));

		const userData = await profileAPI.getUser(id);

		dispatch(setUserData(userData));

		const userStatus = await profileAPI.getStatus(userData.userId);

		dispatch(setUserStatus(userStatus))

	}
}

export const setStatus = (status) => {
	return async (dispatch) => {
		dispatch(setLoading(true));

		const response = await profileAPI.setStatus(status);

		dispatch(setLoading(false))
		if (response.data.resultCode !== 0) return;
		dispatch(setUserStatus(status))
	}
}

export const logIn = (email, password, rememberMe) => {
	return async (dispatch) => {
		const response = await authAPI.logIn(email, password, rememberMe)

		if (response.resultCode === 0) {
			dispatch(getAuth())
		} else {
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

		if (response.data.resultCode !== 0) return;
		dispatch(setUserPhotoSuccess(response.data.data.photos));

	}
}


export default authReducer;