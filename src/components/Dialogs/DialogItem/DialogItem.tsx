import React from 'react';
import s from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';

type PropsType = {
	id: number
	avatar: string
	name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
	let path = '/dialogs/' + props.id;
	return (
		<div className={s.dialog}>
			<div className={s.avatar}>
				<img src={props.avatar} alt='avatar'></img>
			</div>
			<NavLink to={path}>{props.name}</NavLink>
		</div >
	)
}

export default DialogItem;