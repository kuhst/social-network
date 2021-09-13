import { AppStateType } from './ReduxStore'

export const getDialogsData = (state: AppStateType) => {
	return state.dialogsPage.dialogsData
}

export const getMessages = (state: AppStateType) => {
	return state.dialogsPage.messages
}
