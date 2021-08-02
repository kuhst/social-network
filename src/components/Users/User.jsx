import React from 'react';
import BigButton from '../elements/BigButton';
import s from './Users.module.css'
import style from '../../Style.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';


const User = (props) => {
	return (
		<div className={style.block + ' ' + s.block} >
			<NavLink to={`/profile/` + props.id}>
				<div className={s.userPhoto}>
					<img src={(props.photo) ? props.photo : userPhoto} alt={s.Avatar}></img>
				</div>
			</NavLink>
			<div className={s.container}>
				<div className={s.user}>
					<div className={s.userName}>
						{props.name}
					</div>
					{props.status
						? <div className={s.status}><span>{props.status}</span></div>
						: <></>
					}
				</div>
				<div className={s.button}>
					{props.followed
						? <BigButton disabled={props.isFollowing.some(id => id === props.id)} value='unfollow'
							click={() => { props.unfollow(props.id) }} />
						: <BigButton disabled={props.isFollowing.some(id => id === props.id)} value='follow'
							click={() => { props.follow(props.id) }} />
					}
				</div>
			</div>
		</div>
	)
}


export default User;