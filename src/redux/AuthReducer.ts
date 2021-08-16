import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, profileAPI } from "../api/api";
import { PhotosType, ProfileType } from "../type/type";
import { AppStateType, InferActionsTypes } from "./ReduxStore";


type InitialStateType = {
	userId: number | null
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

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'USER_AUTH':
			return {
				...state,
				...action.data,
			}
		case 'SET_CAPTCHA_URL':
			return {
				...state,
				captchaURL: action.captchaURL,
			}
		case 'USER_PROFILE':
			return {
				...state,
				profile: action.profile,
			}
		case 'SET_STATUS':
			return {
				...state,
				status: action.status,
			}
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			}
		case 'SET_USER_PHOTO_SUCCESS':
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			}
		default: return state;
	};
};

type ActionsType = InferActionsTypes<typeof actionsAuthReducer>


export const actionsAuthReducer = {
	setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) =>
		({ type: 'USER_AUTH', data: { userId, login, email, isAuth } } as const),
	setMiStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
	setMiProfile: (profile: ProfileType) => ({ type: 'USER_PROFILE', profile } as const),
	setLoading: (isLoading: boolean) => ({ type: 'SET_LOADING', isLoading } as const),
	setUserPhotoSuccess: (photos: PhotosType) => ({ type: 'SET_USER_PHOTO_SUCCESS', photos } as const),
	setCaptchaURL: (captchaURL: string | null) => ({ type: 'SET_CAPTCHA_URL', captchaURL } as const),
}

// type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuth = (): ThunkType => {
	return async (dispatch) => {
		dispatch(actionsAuthReducer.setCaptchaURL(null))
		const miData = await authAPI.getAuth();

		if (miData.resultCode === 0) {
			let { id, login, email } = miData.data;
			dispatch(actionsAuthReducer.setAuthUserData(id, login, email, true));

			const userData = await profileAPI.getUserProfile(id);

			dispatch(actionsAuthReducer.setMiProfile(userData));

			const userStatus = await profileAPI.getStatus(id);

			dispatch(actionsAuthReducer.setMiStatus(userStatus))
		}

	}
}

export const setStatus = (status: string): ThunkType => {
	return async (dispatch) => {
		dispatch(actionsAuthReducer.setLoading(true));

		const response = await profileAPI.setStatus(status);

		dispatch(actionsAuthReducer.setLoading(false))
		if (response.data.resultCode !== 0) return;
		dispatch(actionsAuthReducer.setMiStatus(status))
	}
}

export const logIn = (email: string, password: string, rememberMe: boolean, captchaCode: string): ThunkType => {
	return async (dispatch) => {
		const response = await authAPI.logIn(email, password, rememberMe, captchaCode)

		if (response.resultCode === 0) {
			dispatch(getAuth())
		} else {
			if (response.resultCode === 10) {
				const captcha = await authAPI.getCaptcha()
				dispatch(actionsAuthReducer.setCaptchaURL(captcha.url))
			}
			// @ts-ignore
			dispatch(stopSubmit('login', { _error: response.messages }))
		}
	}
}

export const logOut = (): ThunkType => {
	return async (dispatch) => {
		const response = await authAPI.logOut()

		if (response.resultCode !== 0) return;
		dispatch(actionsAuthReducer.setAuthUserData(null, null, null, false))

	}
}

export const setUserPhoto = (file: any): ThunkType => {
	return async (dispatch) => {
		const response = await profileAPI.setPhoto(file);

		if (response.data.resultCode === 0) return;
		dispatch(actionsAuthReducer.setUserPhotoSuccess(response.data.data));

	}
}


export default authReducer;