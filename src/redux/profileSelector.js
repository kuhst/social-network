export const getUserProfile = (state) => {
	return state.profilePage.userProfile;
}

export const getUserFriends = (state) => {
	return state.sidebar.friends;
}

export const getPosts = (state) => {
	return state.profilePage.posts
}

export const getUserName = (state) => {
	return state.profilePage.userProfile.fullName
}

export const getUserId = (state) => {
	return state.profilePage.userProfile.userId
}

export const getUserStatus = (state) => {
	return state.profilePage.userStatus
}

export const getUserSmallPhoto = (state) => {
	return state.profilePage.userProfile.photos.small
}

export const getUserLargePhoto = (state) => {
	return state.profilePage.userProfile.photos.large
}

export const getUserAboutMe = (state) => {
	return state.profilePage.userProfile.aboutMe
}

export const getMiProfileFetching = (state) => {
	return state.profilePage.isFetching
}