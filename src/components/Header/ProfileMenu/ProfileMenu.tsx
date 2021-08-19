import React, { ChangeEvent, useEffect, useState } from 'react';
import style from '../../../Style.module.css'
import s from './ProfileMenu.module.css'
import { NavLink } from 'react-router-dom';

type PropsType = {
	status: string | null
	logOut: () => void
	setStatus: (status: string) => void
}

const ProfileMenu: React.FC<PropsType> = React.memo((props) => {

	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status)
	}, [props.status]);

	const applyStatusChange = () => {
		props.setStatus(status as string);
	};

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div className={s.menu}>
			<div className={style.block + ' ' + s.menuContainer}>
				<div className={s.menuName}>
					YOUR ACCOUNT
				</div>
				<ul className={s.menuList}>
					<NavLink to={'/profile/settings'}>
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
					<input onChange={onStatusChange} autoFocus={true} placeholder="Type new post..." value={status ? status : undefined} />
					<button onClick={applyStatusChange}>Sent</button>
				</div>
			</div>
		</div>
	)
})

export default ProfileMenu