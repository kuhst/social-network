import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { ProfileType } from "../type/type";
import { setMiProfile } from "./AuthReducer";
import { AppStateType } from "./ReduxStore";

const ADD_POST = 'profile_ADD_POST';
const DELETE_POST = 'profile_DELETE_POST';
const SET_USER_PROFILE = 'profile_SET_USER_PROFILE';
const SET_USER_STATUS = 'profile_SET_USER_STATUS';
const SET_FETCHING = 'profile_SET_FETCHING';

type PosteType = {
	id: number
	message: string
	likesCount: number
}

type InitialStateType = {
	posts: Array<PosteType>
	userProfile: ProfileType
	isFetching: boolean
	userStatus: string | null
}

let initialState: InitialStateType = {
	posts: [
		{ id: 1, message: 'Hi! It\'s my first post in my social network', likesCount: 1 },
		{ id: 2, message: 'All work', likesCount: 2 },
		{ id: 3, message: 'Some post here', likesCount: 5 },
		{ id: 4, message: 'Short post', likesCount: 0 },
	],
	userProfile: {
		userId: null,
		fullName: null,
		aboutMe: null,
		lookingForAJob: false,
		lookingForAJobDescription: null,
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
	},
	userStatus: null,
	isFetching: false
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, {
					id: ++state.posts.length,
					message: action.postText,
					likesCount: 0,
				}]
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			};
		case SET_USER_PROFILE:
			return {
				...state,
				userProfile: action.userProfile,
			};
		case SET_FETCHING:
			return {
				...state,
				isFetching: action.fetching,
			};
		case SET_USER_STATUS:
			return {
				...state,
				userStatus: action.status
			};
		default: return state;
	};
};

type ActionsType = AddPostActionType | DeletePostActionType | SetUserStatusActionType | SetUserProfileActionType | SetFetchingActionType

type AddPostActionType = {
	type: typeof ADD_POST
	postText: string
}
export const addPost = (postText: string): AddPostActionType => ({ type: ADD_POST, postText });
type DeletePostActionType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });
type SetUserStatusActionType = {
	type: typeof SET_USER_STATUS
	status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status });
type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE
	userProfile: ProfileType
}
export const setUserProfile = (userProfile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, userProfile });
type SetFetchingActionType = {
	type: typeof SET_FETCHING
	fetching: boolean
}
export const setFetching = (fetching: boolean): SetFetchingActionType => ({ type: SET_FETCHING, fetching });


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUser = (userId: number): ThunkType => {
	return async (dispatch: any) => {
		const userProfile = await profileAPI.getUserProfile(userId);
		dispatch(setUserProfile(userProfile));

		const userStatus = await profileAPI.getStatus(userId);
		dispatch(setUserStatus(userStatus))
	}
}

export const setProfileData = (profileData: ProfileType): ThunkType => {
	return async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId;
		dispatch(setFetching(true))
		const response = await profileAPI.setProfileData(profileData);
		if (response.data.resultCode === 0) {
			const miData = await profileAPI.getUserProfile(userId)
			dispatch(setMiProfile(miData))
		} else {
			let contactsError = new Map();
			let otherError = new Map();
			response.data.messages.forEach((element: string) => {
				let key = element.slice((element.indexOf('Contacts->') + 10), (element.length - 1)).toLowerCase();
				let value = element.slice(0, (element.indexOf('(Contacts->') - 1));
				if (element.includes('Contacts->')) {
					contactsError.set(key, value);
				} else {
					otherError.set('_error', element);
				}
			});
			dispatch(stopSubmit('ProfileInfo', { ...Object.fromEntries(otherError), 'contacts': Object.fromEntries(contactsError) }))
		}
		dispatch(setFetching(false))
	}
}


export default profileReducer;