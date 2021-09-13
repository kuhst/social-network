import { Dispatch } from 'redux'
import { chatAPI, StatusType, MessagesReceivedSubscriberType, StatusChangedSubscriberType } from './../api/chatAPI'
import { ChatMessageType } from '../api/chatAPI'
import { BaseThunkType, InferActionsTypes } from './ReduxStore'

let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType,
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'chatAction_SET_MESSAGES':
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages],
			}
		case 'chatAction_SET_STATUS':
			return {
				...state,
				status: action.payload,
			}
		case 'chatAction_RESET_MESSAGES':
			return {
				...state,
				messages: [],
			}
		default:
			return state
	}
}

export const actionsChatReducer = {
	messagesReceived: (messages: ChatMessageType[]) =>
		({ type: 'chatAction_SET_MESSAGES', payload: { messages } } as const),
	messagesReset: () => ({ type: 'chatAction_RESET_MESSAGES' } as const),
	statusChanged: (status: StatusType) => ({ type: 'chatAction_SET_STATUS', payload: status } as const),
}

let _newMessageHandler: MessagesReceivedSubscriberType | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = (messages) => {
			dispatch(actionsChatReducer.messagesReceived(messages))
		}
		return _newMessageHandler
	}
}

let _StatusChangedHandler: StatusChangedSubscriberType | null = null

const StatusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_StatusChangedHandler === null) {
		_StatusChangedHandler = (status) => {
			dispatch(actionsChatReducer.statusChanged(status))
		}
		return _StatusChangedHandler
	}
}

export const startMessagesListening = (): ThunkType => {
	return async (dispatch) => {
		chatAPI.start()
		chatAPI.subscribe(
			'messages-received',
			// @ts-ignore
			newMessageHandlerCreator(dispatch)
		)
		chatAPI.subscribe(
			'status-changed',
			// @ts-ignore
			StatusChangedHandlerCreator(dispatch)
		)
	}
}

export const stopMessagesListening = (): ThunkType => {
	return async (dispatch) => {
		chatAPI.unsubscribe(
			'messages-received',
			// @ts-ignore
			newMessageHandlerCreator(dispatch)
		)
		chatAPI.unsubscribe(
			'status-changed',
			// @ts-ignore
			StatusChangedHandlerCreator(dispatch)
		)
		chatAPI.stop()
		_newMessageHandler = null
		_StatusChangedHandler = null
		dispatch(actionsChatReducer.messagesReset())
	}
}

export const sendMessage = (message: string): ThunkType => {
	return async (dispatch) => {
		chatAPI.sendMessage(message)
	}
}

export default chatReducer

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsChatReducer>
type ThunkType = BaseThunkType<ActionsType>
