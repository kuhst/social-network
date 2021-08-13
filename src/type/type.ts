export type PhotosType = {
	small: string | null
	large: string | null
}

export type ProfileType = {
	aboutMe: string | null
	lookingForAJob: boolean | null
	lookingForAJobDescription: string | null
	fullName: string | null
	userId: number | null
	photos: PhotosType
	contacts: {
		facebook: string | null
		website: string | null
		vk: string | null
		twitter: string | null
		instagram: string | null
		youtube: string | null
		github: string | null
		mainLink: string | null
	}
}

export type FriendType = {
	id: number
	name: string
	avatar: string
}

export type UserType = {
	name: string
	id: number
	uniqueUrlName: string | null
	photos: PhotosType
	status: string | null,
	followed: boolean
}