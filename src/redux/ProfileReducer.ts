import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { profileAPI } from '../api/profileAPI'
import { ProfileType } from '../type/type'
import { actionsAuthReducer } from './AuthReducer'
import { AppStateType, InferActionsTypes } from './ReduxStore'

let initialState = {
	posts: [
		{
			id: 1,
			photoUrl: null,
			message: "Hi! It's my first post in my social network",
			likesCount: 1,
		},
		{ id: 2, message: 'test next message', photoUrl: null, likesCount: 2 },
	] as Array<PosteType>,
	userProfile: {
		userId: null,
		fullName: null,
		aboutMe: null,
		lookingForAJob: false,
		lookingForAJobDescription: null,
		photos: {
			small: null,
			large: null,
		},
		contacts: {
			facebook: null,
			website: null,
			vk: null,
			twitter: null,
			instagram: null,
			youtube: null,
			github: null,
			mainLink: null,
		},
	} as ProfileType,
	userStatus: null as string | null,
	isFetching: false,
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'profileAction_ADD_POST':
			return {
				...state,
				posts: [
					...state.posts,
					{
						id: ++state.posts.length,
						photoUrl: null,
						message: action.postText,
						likesCount: 0,
					},
				],
			}
		case 'profileAction_DELETE_POST':
			return {
				...state,
				posts: state.posts.filter((p) => p.id !== action.postId),
			}
		case 'profileAction_SET_USER_PROFILE':
			return {
				...state,
				userProfile: action.userProfile,
			}
		case 'profileAction_SET_FETCHING':
			return {
				...state,
				isFetching: action.fetching,
			}
		case 'profileAction_SET_USER_STATUS':
			return {
				...state,
				userStatus: action.status,
			}
		default:
			return state
	}
}

export const actionsProfileReducer = {
	addPost: (postText: string) => ({ type: 'profileAction_ADD_POST', postText } as const),
	deletePost: (postId: number) => ({ type: 'profileAction_DELETE_POST', postId } as const),
	setUserStatus: (status: string) => ({ type: 'profileAction_SET_USER_STATUS', status } as const),
	setUserProfile: (userProfile: ProfileType) => ({ type: 'profileAction_SET_USER_PROFILE', userProfile } as const),
	setFetching: (fetching: boolean) => ({ type: 'profileAction_SET_FETCHING', fetching } as const),
}

export const getUser = (userId: number): ThunkType => {
	return async (dispatch: any) => {
		const userProfile = await profileAPI.getUserProfile(userId)
		dispatch(actionsProfileReducer.setUserProfile(userProfile))

		const userStatus = await profileAPI.getStatus(userId)
		dispatch(actionsProfileReducer.setUserStatus(userStatus))
	}
}

export const setProfileData = (profileData: ProfileType): ThunkType => {
	return async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId
		dispatch(actionsProfileReducer.setFetching(true))
		const response = await profileAPI.setProfileData(profileData)
		if (response.resultCode === 0) {
			const miData = await profileAPI.getUserProfile(userId)
			dispatch(actionsAuthReducer.setMiProfile(miData))
		} else {
			let contactsError = new Map()
			let otherError = new Map()
			response.messages.forEach((element: string) => {
				let key = element.slice(element.indexOf('Contacts->') + 10, element.length - 1).toLowerCase()
				let value = element.slice(0, element.indexOf('(Contacts->') - 1)
				if (element.includes('Contacts->')) {
					contactsError.set(key, value)
				} else {
					otherError.set('_error', element)
				}
			})
			dispatch(
				stopSubmit('ProfileInfo', {
					...Object.fromEntries(otherError),
					contacts: Object.fromEntries(contactsError),
				})
			)
		}
		dispatch(actionsProfileReducer.setFetching(false))
	}
}

export default profileReducer

export type PosteType = {
	id: number
	message: string
	photoUrl: string | null
	likesCount: number
}
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsProfileReducer>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
