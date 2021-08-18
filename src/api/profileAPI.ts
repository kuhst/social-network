import { PhotosType, ProfileType } from "../type/type";
import { instanceAxios, APIResponseType } from "./api";

type SetPhotoResponseData = {
	photos: PhotosType
}

export const profileAPI = {
	getUserProfile(userId: number) {
		return instanceAxios.get<ProfileType>(`/profile/` + userId)
			.then(response => response.data)
	},
	getStatus(userId: number) {
		return instanceAxios.get<string>(`/profile/status/` + userId)
			.then(response => response.data)
	},
	setStatus(status: string) {
		return instanceAxios.put<APIResponseType>('/profile/status', { status })
			.then(response => response.data)
	},
	setProfileData(profileData: ProfileType) {
		return instanceAxios.put<APIResponseType>('/profile', profileData)
			.then(response => response.data)
	},
	setPhoto(filePhoto: any) {
		const formData = new FormData();
		formData.append("image", filePhoto);
		return instanceAxios.put<APIResponseType<SetPhotoResponseData>>('/profile/photo', formData, {
			headers: {
				"content-type": "multipart/form-data"
			}
		})
			.then(response => response.data)
	}
};