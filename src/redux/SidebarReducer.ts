import { FilterType } from './UsersReducer'
import { usersAPI } from '../api/usersAPI'
import { UserType } from '../type/type'
import { BaseThunkType, InferActionsTypes } from './ReduxStore'

let initialState = {
	friends: [] as Array<UserType>,
	isFetching: false,
	friendsCount: 0,
}

const sidebarReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'sidebarAction_SET_FRIENDS':
			return {
				...state,
				friends: action.friends,
			}
		case 'sidebarAction_SET_FETCHING':
			return {
				...state,
				isFetching: action.isFetching,
			}
		case 'sidebarAction_SET_FRIENDS_COUNT':
			return {
				...state,
				friendsCount: action.friendsCount,
			}
		default:
			return state
	}
}

export const actionsSidebarReducer = {
	setUsersFriends: (friends: Array<UserType>) => ({ type: 'sidebarAction_SET_FRIENDS', friends } as const),
	setFetching: (isFetching: boolean) => ({ type: 'sidebarAction_SET_FETCHING', isFetching } as const),
	setFriendsCount: (friendsCount: number) => ({ type: 'sidebarAction_SET_FRIENDS_COUNT', friendsCount } as const),
}

export const getFriends = (): ThunkType => {
	return async (dispatch) => {
		dispatch(actionsSidebarReducer.setFetching(true))

		const response = await usersAPI.getUsers(12, 1, {
			friend: true,
			term: '',
		} as FilterType)

		dispatch(actionsSidebarReducer.setUsersFriends(response.items))
		dispatch(actionsSidebarReducer.setFriendsCount(response.totalCount))
		dispatch(actionsSidebarReducer.setFetching(false))
	}
}

export default sidebarReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsSidebarReducer>
type ThunkType = BaseThunkType<ActionsType>
