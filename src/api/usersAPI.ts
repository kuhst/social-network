import { FilterType } from './../redux/UsersReducer';
import { PhotosType } from "../type/type";
import { instanceAxios, APIResponseType } from "./api";

type UserType = {
	name: string
	id: number
	photos: PhotosType
	status: string | null
	followed: boolean
}
type UsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}

export const usersAPI = {
	getUsers(usersCountOnPage = 9, currentPage = 1, filter: FilterType = {term: '', friend: ''}) {
		return instanceAxios.get<UsersResponseType>(`/users?count=${usersCountOnPage}&page=${currentPage}&term=${filter.term}&friend=${filter.friend}`)
			.then(response => response.data)
	},
	follow(id: number) {
		return instanceAxios.post<APIResponseType>(`/follow/${id}`)
			.then(response => response.data)
	},
	unfollow(id: number) {
		return instanceAxios.delete<APIResponseType>(`/follow/${id}`)
			.then(response => response.data)
	}
};