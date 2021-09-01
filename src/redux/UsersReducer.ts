import { BaseThunkType, InferActionsTypes } from './ReduxStore'
import { Dispatch } from 'redux'
import { usersAPI } from '../api/usersAPI'
import { UserType } from '../type/type'
import { objectsHelper } from '../utils/objectsHelper'
import { APIResponseType } from '../api/api'
import { getFriends } from './SidebarReducer'

let initialState = {
    users: [] as Array<UserType>,
    usersCount: 0,
    usersCountOnPage: 12,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean,
    },
}

const usersReducer = (
    state = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'usersAction_FOLLOW':
            return {
                ...state,
                users: objectsHelper(state.users, action.userId, 'id', {
                    followed: true,
                }),
            }
        case 'usersAction_UNFOLLOW':
            return {
                ...state,
                users: objectsHelper(state.users, action.userId, 'id', {
                    followed: false,
                }),
            }
        case 'usersAction_SET_USERS':
            return {
                ...state,
                users: action.users,
            }
        case 'usersAction_SET_USERS_SUM':
            return {
                ...state,
                users: [...state.users, ...action.users],
            }
        case 'usersAction_SET_PAGE_NUMBER':
            return {
                ...state,
                currentPage: action.pageNumber,
            }
        case 'usersAction_SET_USERS_COUNT':
            return {
                ...state,
                usersCount: action.usersCount,
            }
        case 'usersAction_SET_USERS_COUNT_ON_PAGE':
            return {
                ...state,
                usersCountOnPage: action.usersCountOnPage,
            }
        case 'usersAction_SET_FILTER':
            return {
                ...state,
                filter: action.filter,
            }
        case 'usersAction_SET_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case 'usersAction_TOGGLE_IS_FOLLOWING':
            return {
                ...state,
                followingInProgress: action.isFollowing
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            }
        default:
            return state
    }
}

export const actionsUsersReducer = {
    followSuccess: (userId: number) =>
        ({ type: 'usersAction_FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) =>
        ({ type: 'usersAction_UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) =>
        ({ type: 'usersAction_SET_USERS', users } as const),
    setUsersSum: (users: Array<UserType>) =>
        ({ type: 'usersAction_SET_USERS_SUM', users } as const),
    setFilter: (filter: FilterType) =>
        ({ type: 'usersAction_SET_FILTER', filter } as const),
    setPageToCurrent: (pageNumber: number) =>
        ({ type: 'usersAction_SET_PAGE_NUMBER', pageNumber } as const),
    setUsersCount: (usersCount: number) =>
        ({ type: 'usersAction_SET_USERS_COUNT', usersCount } as const),
    setUsersCountOnPage: (usersCountOnPage: number) =>
        ({
            type: 'usersAction_SET_USERS_COUNT_ON_PAGE',
            usersCountOnPage,
        } as const),
    setFetching: (isFetching: boolean) =>
        ({ type: 'usersAction_SET_FETCHING', isFetching } as const),
    toggleIsFollowing: (isFollowing: boolean, userId: number) =>
        ({
            type: 'usersAction_TOGGLE_IS_FOLLOWING',
            isFollowing,
            userId,
        } as const),
}

export const responseUsers = (
    usersCountOnPage: number,
    currentPage: number,
    filter: FilterType,
    sum: boolean
): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsUsersReducer.setFetching(true))
        !sum && dispatch(actionsUsersReducer.setPageToCurrent(currentPage))
        !sum &&
            dispatch(actionsUsersReducer.setUsersCountOnPage(usersCountOnPage))
        !sum && dispatch(actionsUsersReducer.setFilter(filter))

        const response = await usersAPI.getUsers(
            usersCountOnPage,
            currentPage,
            filter
        )

        sum
            ? dispatch(actionsUsersReducer.setUsersSum(response.items))
            : dispatch(actionsUsersReducer.setUsers(response.items))
        dispatch(actionsUsersReducer.setUsersCount(response.totalCount))
        dispatch(actionsUsersReducer.setFetching(false))
    }
}

const _followUnfollow = async (
    userID: number,
    dispatch: DispatchType,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsType
) => {
    dispatch(actionsUsersReducer.toggleIsFollowing(true, userID))

    const response = await apiMethod(userID)

    if (response.resultCode === 0) {
        dispatch(actionCreator(userID))
        // @ts-ignore
        dispatch(getFriends())
    }
    dispatch(actionsUsersReducer.toggleIsFollowing(false, userID))
}

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollow(
            userID,
            dispatch,
            usersAPI.unfollow.bind(usersAPI),
            actionsUsersReducer.unfollowSuccess
        )
    }
}

export const follow = (userID: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollow(
            userID,
            dispatch,
            usersAPI.follow.bind(usersAPI),
            actionsUsersReducer.followSuccess
        )
    }
}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actionsUsersReducer>
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>
