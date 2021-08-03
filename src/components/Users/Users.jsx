import React from 'react';
import s from './Users.module.css'
import User from './User';
import Paginator from '../elements/Paginator';


const Users = ({ usersCount, usersCountOnPage, currentPage, onPageChanged, users, ...props }) => {

	let usersItems = users.map(u => <User
		key={u.id} id={u.id} name={u.name}
		photo={u.photos.large} status={u.status}
		followed={u.followed} isFollowing={props.isFollowing}
		unfollow={props.unfollow} follow={props.follow} />)

	return (
		<div>
			<div className={s.pages}>
				<Paginator itemsCount={usersCount} itemsCountOnPage={usersCountOnPage} currentPage={currentPage} onPageChanged={onPageChanged} />
			</div>
			<div className={s.usersPage}>
				{usersItems}
			</div>
		</div >
	)
}


export default Users;