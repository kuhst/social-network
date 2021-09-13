import { getAuth } from './AuthReducer'
import { InferActionsTypes } from './ReduxStore'

let initialState = {
	initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}

export const actionsAppReducer = {
	initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const),
}

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuth())
	Promise.all([promise]).then(() => {
		dispatch(actionsAppReducer.initializedSuccess())
	})
}

export default appReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsAppReducer>
