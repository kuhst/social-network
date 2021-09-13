import axios from 'axios'

export const instanceAxios = axios.create({
	withCredentials: true,
	headers: {
		'API-KEY': '71bc2887-8a06-449b-b233-4c545a091aa6',
	},
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
})

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
	data: D
	messages: Array<string>
	resultCode: RC
}

export enum ResultCodeEnum {
	Success = 0,
	Error = 1,
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10,
}
