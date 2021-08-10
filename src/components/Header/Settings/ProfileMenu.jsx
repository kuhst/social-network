import React, { useEffect, useState } from 'react';
import style from '../../../Style.module.css'
import s from './ProfileMenu.module.css'
import { NavLink } from 'react-router-dom';


const ProfileMenu = React.memo((props) => {

	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status)
	}, [props.status]);

	const applyStatusChange = () => {
		props.setStatus(status);
	};

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div className={s.menu}>
			<div className={style.block + ' ' + s.menuContainer}>
				<div className={s.menuName}>
					YOUR ACCOUNT
				</div>
				<ul className={s.menuList}>
					<NavLink to={'/settings'}>
						<li className={s.menuLink}>
							Profile Settings
						</li>
					</NavLink>
					<li onClick={props.logOut} className={s.menuLink + ' ' + s.signOut}>
						<span>Sign out</span>
					</li>
				</ul>
				<div className={s.menuName}>
					CHANGE STATUS
				</div>
				<div className={s.statusChange}>
					<input onChange={onStatusChange} autoFocus={true} placeholder="Type new post..." value={status} />
					<button onClick={applyStatusChange}>Sent</button>
				</div>
			</div>
		</div>
	)
})

export default ProfileMenu