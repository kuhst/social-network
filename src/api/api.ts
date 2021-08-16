import { PhotosType, ProfileType } from './../type/type';
import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	headers: {
		'API-KEY': '65f23381-a001-469d-b8d8-33dccd7a4fd2'
	},
	baseURL: 'https://social-network.samuraijs.com/api/1.0'
})

export enum ResultCodeEnum {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}
type UserType = {
	name: string
	id: number
	photos: {
		small: string | null
		large: string | null
	}
	status: string | null
	followed: boolean
}
type UsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}
type FollowUnfollowResponseType = {
	data: any
	resultCode: ResultCodeEnum
	messages: Array<string>
}

export const usersAPI = {
	getUsers(usersCountOnPage = 9, currentPage = 1) {
		return instance.get<UsersResponseType>(`/users?count=${usersCountOnPage}&page=${currentPage}`)
			.then(response => response.data)
	},
	follow(id: number) {
		return instance.post<FollowUnfollowResponseType>(`/follow/${id}`)
			.then(response => response.data)
	},
	unfollow(id: number) {
		return instance.delete<FollowUnfollowResponseType>(`/follow/${id}`)
			.then(response => response.data)
	}
};

type MiResponseType = {
	data: { id: number, email: string, login: string }
	resultCode: ResultCodeEnum
	messages: Array<string>
}
type LoginResponseType = {
	data: { userId: number }
	resultCode: ResultCodeEnum | ResultCodeForCaptcha
	messages: Array<string>
}
type LogoutResponseType = {
	data: any
	resultCode: ResultCodeEnum
	messages: Array<string>
}
type CaptchaResponseType = {
	url: string
}

export const authAPI = {
	getAuth() {
		return instance.get<MiResponseType>(`/auth/me`)
			.then(response => response.data)
	},
	logIn(email: string, password: string, rememberMe = false, captcha: string | null = null) {
		return instance.post<LoginResponseType>('/auth/login', { email, password, rememberMe, captcha })
			.then(response => response.data)
	},
	logOut() {
		return instance.delete<LogoutResponseType>('/auth/login')
			.then(response => response.data)
	},
	getCaptcha() {
		return instance.get<CaptchaResponseType>('/security/get-captcha-url')
			.then(response => response.data)
	}
};


type SetUserProfileResponseType = {
	data: any
	resultCode: ResultCodeEnum
	messages: Array<string>
}
type SetUserStatusResponseType = {
	data: any
	resultCode: ResultCodeEnum
	messages: Array<string>
}
type SetPhotoResponseType = {
	data: PhotosType
	resultCode: ResultCodeEnum
	messages: Array<string>
}

export const profileAPI = {
	getUserProfile(userId: number) {
		return instance.get<ProfileType>(`/profile/` + userId)
			.then(response => response.data)
	},
	getStatus(userId: number) {
		return instance.get<string>(`/profile/status/` + userId)
			.then(response => response.data)
	},
	setStatus(status: string) {
		return instance.put<SetUserStatusResponseType>('/profile/status', { status })
	},
	setProfileData(profileData: ProfileType) {
		return instance.put('/profile', profileData)
	},
	setPhoto(filePhoto: any) {
		const formData = new FormData();
		formData.append("image", filePhoto);
		return instance.put<SetPhotoResponseType>('/profile/photo', formData, {
			headers: {
				"content-type": "multipart/form-data"
			}
		})
	}
};