import { AppStateType } from './ReduxStore'

export const getUserProfile = (state: AppStateType) => {
	return state.profilePage.userProfile
}

export const getPosts = (state: AppStateType) => {
	return state.profilePage.posts
}

export const getUserName = (state: AppStateType) => {
	return state.profilePage.userProfile.fullName
}

export const getUserId = (state: AppStateType) => {
	return state.profilePage.userProfile.userId
}

export const getUserStatus = (state: AppStateType) => {
	return state.profilePage.userStatus
}

export const getUserSmallPhoto = (state: AppStateType) => {
	return state.profilePage.userProfile.photos.small
}

export const getUserLargePhoto = (state: AppStateType) => {
	return state.profilePage.userProfile.photos.large
}

export const getUserAboutMe = (state: AppStateType) => {
	return state.profilePage.userProfile.aboutMe
}

export const getMiProfileFetching = (state: AppStateType) => {
	return state.profilePage.isFetching
}
