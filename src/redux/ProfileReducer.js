import { profileAPI } from "../api/api";
import { setMiData } from "./AuthReducer";

const ADD_POST = 'profile_ADD_POST';
const DELETE_POST = 'profile_DELETE_POST';
const SET_USER_PROFILE = 'profile_SET_USER_PROFILE';
const SET_USER_STATUS = 'profile_SET_USER_STATUS';
const SET_FETCHING = 'profile_SET_FETCHING';

let initialState = {
	posts: [
		{ id: 1, message: 'Hi! It\'s my first post in my social network', likesCount: 1 },
		{ id: 2, message: 'All work', likesCount: 2 },
		{ id: 3, message: 'Some post here', likesCount: 5 },
		{ id: 4, message: 'Long post. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugiten, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi en lod nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit en lorem ipsum der.', likesCount: 0 },
	],
	userProfile: {
		userId: null,
		fullName: null,
		aboutMe: null,
		lookingForAJob: false,
		lookingForAJobDescription: null,
		status: null,
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
	isFetching: false
}

const profileReducer = (state = initialState, action) => {
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
				userProfile: { ...state.userProfile, status: action.status }
			};
		default: return state;
	};
};

export const addPost = (postText) => ({ type: ADD_POST, postText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile });
export const setFetching = (fetching) => ({ type: SET_FETCHING, fetching });


export const getUser = (userId) => {
	return async (dispatch) => {
		const userProfile = await profileAPI.getUser(userId);
		dispatch(setUserProfile(userProfile));

		const userStatus = await profileAPI.getStatus(userId);
		dispatch(setUserStatus(userStatus))
	}
}

export const setProfileInfo = (profileData) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		dispatch(setFetching(true))
		const response = await profileAPI.setProfileInfo(profileData);
		if (response.data.resultCode === 0) {
			const miData = await profileAPI.getUser(userId)
			dispatch(setMiData(miData))
			dispatch(setFetching(false))
		}

	}
}


export default profileReducer;