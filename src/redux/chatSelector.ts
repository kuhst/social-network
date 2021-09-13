import { AppStateType } from './ReduxStore'

export const getStatus = (state: AppStateType) => {
	return state.chat.status
}

export const getChatMessages = (state: AppStateType) => {
	return state.chat.messages
}
