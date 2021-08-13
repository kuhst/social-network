const ADD_MESSAGE = 'dialogs_ADD_MESSAGE';

type DialogType = {
	id: number
	name: string
	avatar: string
}
type MessageType = {
	id: number
	message: string
	from: 'mi' | 'friend'
}
type InitialStateType = {
	dialogsData: Array<DialogType>
	messages: Array<MessageType>
}
let initialState: InitialStateType = {
	dialogsData: [
		{ id: 1, name: 'Perec', avatar: 'https://i0.wp.com/7youtube.ru/wp-content/uploads/2017/01/dmdmdmddsaaaa.jpg' },
		{ id: 2, name: 'Vasia', avatar: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg' },
		{ id: 3, name: 'Vova', avatar: 'https://ispolnu.ru/uploads/services/20180618/1529316303dbca.jpg' },
		{ id: 4, name: 'Anton', avatar: 'https://discordgid.ru/wp-content/uploads/2020/03/diskord-avatar.jpg' },
	],
	messages: [
		{ id: 1, message: 'hi!', from: 'friend' },
		{ id: 2, message: 'How is your programing?', from: 'friend' },
		{ id: 3, message: 'Ok', from: 'mi' },
		{ id: 4, message: 'Cool!', from: 'friend' },
		{ id: 5, message: 'Some log message. skfjnvksv sdoiv csodifvjc skdjvn sdfcjvsfldkv dsfkv dfkjnvd kfjvnd', from: 'mi' },
	],
}


const dialogsReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case ADD_MESSAGE:
			return {
				...state,
				messages: [...state.messages, {
					id: ++state.messages.length,
					message: action.message,
					from: 'mi',
				}],
			}
		default: return state;
	};
};

type AddMessageActionType = {
	type: typeof ADD_MESSAGE
	message: string
}
const addMessageAC = (message: string): AddMessageActionType => ({ type: ADD_MESSAGE, message });

export const addMessage = (message: string) => {
	return async (dispatch: any) => {
		dispatch(addMessageAC(message));
	}
}

export default dialogsReducer;