import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	headers: {
		'API-KEY': '65f23381-a001-469d-b8d8-33dccd7a4fd2'
	},
	baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
	getUsers(usersCountOnPage = 9, currentPage = 1) {
		return instance.get(`users?count=${usersCountOnPage}&page=${currentPage}`)
			.then(response => response.data)
	},
	follow(id) {
		return instance.post(`follow/${id}`)
			.then(response => response.data)
	},
	unfollow(id) {
		return instance.delete(`follow/${id}`)
			.then(response => response.data)
	}
};

export const authAPI = {
	getAuth() {
		return instance.get(`auth/me`)
			.then(response => response.data)
	},
	logIn(email, password, rememberMe = false) {
		return instance.post('/auth/login', { email, password, rememberMe })
			.then(response => response.data)
	},
	logOut() {
		return instance.delete('/auth/login')
			.then(response => response.data)
	}
};

export const profileAPI = {
	getUser(userId) {
		return instance.get(`profile/` + userId)
			.then(response => response.data)
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId)
			.then(response => response.data)
	},
	setStatus(status) {
		return instance.put('/profile/status', { status })
	}
};