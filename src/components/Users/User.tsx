import React from 'react';
import BigButton from '../elements/BigButton';
import s from './Users.module.css'
import style from '../../Style.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

type PropsType = {
	id: number
	photo: string | null
	name: string
	status: string | null
	followed: boolean
	followingInProgress: Array<number>

	follow: (userId: number) => void
	unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({ id, photo, name, status, followed, follow, unfollow, followingInProgress }) => {
	return (
		<div className={style.block + ' ' + s.block} >
			<NavLink to={`/profile/` + id}>
				<div className={s.userPhoto}>
					<img src={(photo) ? photo : userPhoto} alt={s.Avatar}></img>
				</div>
			</NavLink>
			<div className={s.container}>
				<div className={s.user}>
					<div className={s.userName}>
						{name}
					</div>
					{status
						? <div className={s.status}><span>{status}</span></div>
						: <></>
					}
				</div>
				<div className={s.button}>
					{followed
						? <BigButton disabled={followingInProgress.some(userId => userId === id)} value='unfollow'
							click={() => { unfollow(id) }} />
						: <BigButton disabled={followingInProgress.some(userId => userId === id)} value='follow'
							click={() => { follow(id) }} />
					}
				</div>
			</div>
		</div>
	)
}


export default User;