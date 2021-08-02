import { profileAPI } from "../api/api";

const ADD_POST = 'profile_ADD_POST';
const DELETE_POST = 'profile_DELETE_POST';
const SET_USER_PROFILE = 'profile_SET_USER_PROFILE';

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
			}
		default: return state;
	};
};

export const addPost = (postText) => ({ type: ADD_POST, postText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
// export const addPost = (postText) => ({ type: ADD_POST, post: postText.postText });
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile });


export const getUser = (userId) => {
	return async (dispatch) => {
		if (!userId) { userId = 18192 };
		const userProfile = await profileAPI.getUser(userId);

		dispatch(setUserProfile(userProfile));
	}
}

export default profileReducer;