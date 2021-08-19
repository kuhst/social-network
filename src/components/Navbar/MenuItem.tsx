import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
	link: string
	className: string
}

export const MenuItem: React.FC<PropsType> = (props) => {
	return (
		<div className={s.item}>
			<NavLink to={props.link} activeClassName={s.activeLink} className={props.className}>
				{props.link[1].toUpperCase() + props.link.slice(2)}
			</NavLink>
		</div>
	)
}

export default MenuItem;