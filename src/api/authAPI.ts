import { instanceAxios, APIResponseType, ResultCodeEnum, ResultCodeForCaptcha } from './api';

type MiResponseType = {
	id: number
	email: string
	login: string
}
type LoginResponseType = {
	userId: number
}
type CaptchaResponseType = {
	url: string
}

export const authAPI = {
	getAuth() {
		return instanceAxios.get<APIResponseType<MiResponseType>>('/auth/me')
			.then(response => response.data)
	},
	logIn(email: string, password: string, rememberMe = false, captcha: string | null = null) {
		return instanceAxios.post<APIResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha>>
			('/auth/login', { email, password, rememberMe, captcha })
			.then(response => response.data)
	},
	logOut() {
		return instanceAxios.delete<APIResponseType>('/auth/login')
			.then(response => response.data)
	},
	getCaptcha() {
		return instanceAxios.get<CaptchaResponseType>('/security/get-captcha-url')
			.then(response => response.data)
	}
};