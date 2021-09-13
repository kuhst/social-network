import usersReducer, { actionsUsersReducer, InitialStateType } from './UsersReducer'

let state: InitialStateType

beforeEach(() => {
	state = {
		users: [
			{ id: 0, name: 'user 0', photos: { small: null, large: null }, status: 'status 0', followed: false },
			{ id: 1, name: 'user 1', photos: { small: null, large: null }, status: 'status 1', followed: true },
			{ id: 2, name: 'user 2', photos: { small: null, large: null }, status: 'status 2', followed: true },
			{ id: 3, name: 'user 3', photos: { small: null, large: null }, status: 'status 3', followed: false },
		],
		usersCount: 0,
		usersCountOnPage: 12,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [],
		filter: {
			term: '',
			friend: null,
		},
	}
})

// afterEach(() => {
// 	state = null
// })

test('Follow success', () => {
	let newState = usersReducer(state, actionsUsersReducer.followSuccess(3))

	expect(newState.users[0].followed).toBeFalsy()
	expect(newState.users[3].followed).toBeTruthy()
})

test('Unfollow success', () => {
	let newState = usersReducer(state, actionsUsersReducer.unfollowSuccess(1))

	expect(newState.users[1].followed).toBeFalsy()
	expect(newState.users[2].followed).toBeTruthy()
	expect(newState.users[3].followed).toBeFalsy()
})
