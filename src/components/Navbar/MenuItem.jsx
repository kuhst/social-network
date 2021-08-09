import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

export const MenuItem = (props) => {
	return (
		<div className={s.item}>
			<NavLink to={props.link} activeClassName={s.activeLink} className={props.className}>
				{props.link[1].toUpperCase() + props.link.slice(2)}
			</NavLink>
		</div>
	)
}

export default MenuItem;