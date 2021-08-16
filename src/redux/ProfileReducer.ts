import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { ProfileType } from "../type/type";
import { actionsAuthReducer } from "./AuthReducer";
import { AppStateType, InferActionsTypes } from "./ReduxStore";

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
		case 'ADD_POST':
			return {
				...state,
				posts: [...state.posts, {
					id: ++state.posts.length,
					message: action.postText,
					likesCount: 0,
				}]
			};
		case 'DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			};
		case 'SET_USER_PROFILE':
			return {
				...state,
				userProfile: action.userProfile,
			};
		case 'SET_FETCHING':
			return {
				...state,
				isFetching: action.fetching,
			};
		case 'SET_USER_STATUS':
			return {
				...state,
				userStatus: action.status
			};
		default: return state;
	};
};

type ActionsType = InferActionsTypes<typeof actionsProfileReducer>

export const actionsProfileReducer = {
	addPost: (postText: string) => ({ type: 'ADD_POST', postText } as const),
	deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
	setUserStatus: (status: string) => ({ type: 'SET_USER_STATUS', status } as const),
	setUserProfile: (userProfile: ProfileType) => ({ type: 'SET_USER_PROFILE', userProfile } as const),
	setFetching: (fetching: boolean) => ({ type: 'SET_FETCHING', fetching } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUser = (userId: number): ThunkType => {
	return async (dispatch: any) => {
		const userProfile = await profileAPI.getUserProfile(userId);
		dispatch(actionsProfileReducer.setUserProfile(userProfile));

		const userStatus = await profileAPI.getStatus(userId);
		dispatch(actionsProfileReducer.setUserStatus(userStatus))
	}
}

export const setProfileData = (profileData: ProfileType): ThunkType => {
	return async (dispatch: any, getState: any) => {
		const userId = getState().auth.userId;
		dispatch(actionsProfileReducer.setFetching(true))
		const response = await profileAPI.setProfileData(profileData);
		if (response.data.resultCode === 0) {
			const miData = await profileAPI.getUserProfile(userId)
			dispatch(actionsAuthReducer.setMiProfile(miData))
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
		dispatch(actionsProfileReducer.setFetching(false))
	}
}


export default profileReducer;