import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../../Style.module.css';
import s from './Header.module.css';
import userPhoto from '../../assets/images/user.jpg';
import preloaderImage from '../../assets/images/preloaderPoint.svg';
import ProfileMenu from './Settings/ProfileMenu';


const Header = (props) => {

	let preloader = (
		<div className={s.preloader}>
			<img src={preloaderImage} alt='Preloader' />
		</div>
	)

	let statusBlock = (
		<span>{props.status || 'no status'}</span>
	)

	let login = <NavLink to={'/login'} className={s.login}>Log In</NavLink>;

	let user = <>
		<ul className={s.menuList}>
			<li className={s.menuLink}>

				<div className={s.user}>
					<div className={s.userPhoto}>
						<img src={props.photo ? props.photo : userPhoto} alt='mainImage'></img>
					</div>
					<div className={s.controlBlock}>
						<div className={s.name}>
							{props.login}
						</div>
						<div className={s.status}>
							{props.loading ? preloader : statusBlock}
						</div>
					</div>
					{/* <div className={s.arrow}>
						>
					</div> */}
					<div className={s.menu}>
						<ProfileMenu status={props.status} setStatus={props.setStatus} loading={props.loading} logOut={props.logOut} />
					</div>
				</div>

			</li>
		</ul>
	</>

	return (
		<header className={s.header} >
			<div className={`${style.container} ${s.container}`}>
				<div className={s.logo}>
					<span className={s.mainName}>SAMURAIS</span>
					<span className={s.secondName}>social network</span>
				</div>
				<div className={s.freeSpace}></div>
				<input placeholder="Search here..." className={s.search + ' ' + style.comingSoon} />
				{props.isAuth ? user : login}
			</div>
		</header >
	)
}

export default Header;