import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getAuth } from "./AuthReducer";
import { AppStateType } from "./ReduxStore";

const INITIALIZED_SUCCESS = 'app_INITIALIZED_SUCCESS';

type InitialStateType = {
	initialized: boolean
}

let initialState: InitialStateType = {
	initialized: false,
}

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}
		default: return state;
	};
};

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });


type DispatchType = Dispatch<InitializedSuccessActionType>

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuth());
	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess());
		})
}

export default appReducer;