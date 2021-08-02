import dialogsReducer from "./DialogsReducer";

const store = {
	_state: {
		dialogsPage: {
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
			textarea: '',
		},
		profilePage: {
			posts: [
				{ id: 1, message: 'Hi! It\'s my first post in my social network', liksCount: 5 },
				{ id: 2, message: 'All work', liksCount: 5 },
				{ id: 3, message: 'Some post here', liksCount: 5 },
				{ id: 4, message: 'Long post. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugiten, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi en lod nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit en lorem ipsum der.', liksCount: 5 },
			],
			textarea: '',
		},
		sidebar: {
			friends: [
				{ id: 1, name: 'Perec', avatar: 'https://i0.wp.com/7youtube.ru/wp-content/uploads/2017/01/dmdmdmddsaaaa.jpg' },
				{ id: 2, name: 'Vasia', avatar: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg' },
				{ id: 3, name: 'Vova', avatar: 'https://ispolnu.ru/uploads/services/20180618/1529316303dbca.jpg' },
				{ id: 4, name: 'Anton', avatar: 'https://discordgid.ru/wp-content/uploads/2020/03/diskord-avatar.jpg' },
				{ id: 5, name: 'Mary', avatar: 'https://omoro.ru/wp-content/uploads/2018/05/prikilnie-kartinki-na-avatarky-dlia-devyshek-9.jpg' },
				{ id: 6, name: 'Kolja', avatar: 'https://f1.upet.com/A_r2u6uZhnxA_x.jpg' },
				{ id: 7, name: 'Dron', avatar: 'https://pristor.ru/wp-content/uploads/2018/07/%D0%9E%D1%82%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%B8-%D1%84%D0%BE%D1%82%D0%BE-%D0%BD%D0%B0-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D1%83-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%B0%D1%80%D0%BD%D0%B5%D0%B9-%D0%B8-%D0%BC%D1%83%D0%B6%D1%87%D0%B8%D0%BD-%D1%81%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-2018-17-726x1024.jpg' },
			],
		},
	},
	_callSubscriber() {
		console.log('render')
	},

	subscribe(observe) {
		this._callSubscriber = observe;
	},
	getState() {
		return this._state;
	},

	dispatch(action) {
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.profilePage = dialogsReducer(this._state.profilePage, action);
		this._state.sidebar = dialogsReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);
	}
};


export default store;
window.store = store;