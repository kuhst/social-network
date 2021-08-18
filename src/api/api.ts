import axios from "axios";

export const instanceAxios = axios.create({
	withCredentials: true,
	headers: {
		'API-KEY': '65f23381-a001-469d-b8d8-33dccd7a4fd2'
	},
	baseURL: 'https://social-network.samuraijs.com/api/1.0'
})

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
	data: D
	messages: Array<string>
	resultCode: RC
}

export enum ResultCodeEnum {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}