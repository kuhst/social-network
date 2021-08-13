import React from 'react';
import s from './Users.module.css'
import User from './User';
import Paginator from '../elements/Paginator';
import { UserType } from '../../type/type';

type PropsType = {
	usersCount: number
	usersCountOnPage: number
	currentPage: number
	users: Array<UserType>
	followingInProgress: Array<number>

	unfollow: (userId: number) => void
	follow: (userId: number) => void
	onPageChanged: (pageNumber: number) => void
}

const Users: React.FC<PropsType> = ({ usersCount, usersCountOnPage, currentPage, onPageChanged, users, ...props }) => {

	let usersItems = users.map(u => <User
		key={u.id} id={u.id} name={u.name}
		photo={u.photos.large} status={u.status}
		followed={u.followed} followingInProgress={props.followingInProgress}
		unfollow={props.unfollow} follow={props.follow} />)

	return (
		<div>
			<div className={s.pages}>
				<Paginator itemsCount={usersCount} itemsCountOnPage={usersCountOnPage}
					currentPage={currentPage} onPageChanged={onPageChanged} />
			</div>
			<div className={s.usersPage}>
				{usersItems}
			</div>
		</div >
	)
}


export default Users;