import { Dispatch } from "redux";
import { getAuth } from "./AuthReducer";
import { InferActionsTypes } from "./ReduxStore";


type InitialStateType = {
	initialized: boolean
}

let initialState: InitialStateType = {
	initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true
			}
		default: return state;
	};
};

type ActionsType = InferActionsTypes<typeof actionsAppReducer>

const actionsAppReducer = {
	initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' })
}

type DispatchType = Dispatch<ActionsType>

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuth());
	Promise.all([promise])
		.then(() => {
			dispatch(actionsAppReducer.initializedSuccess());
		})
}

export default appReducer;