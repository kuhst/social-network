import React from 'react';
import s from './Navbar.module.css';
import style from '../../Style.module.css';
import userPhoto from '../../assets/images/user.jpg';
import MenuItem from './MenuItem';

class Navbar extends React.Component {
	render() {
		let photoUrl = !this.props.userPhoto ? userPhoto : this.props.userPhoto;
		let aboutMe = !this.props.aboutMe ? '' : <div className={s.aboutMe}>{this.props.aboutMe}</div>;
		let navItems = [
			{ link: '/profile', forInitialized: true },
			{ link: '/dialogs', forInitialized: true },
			{ link: '/news', forInitialized: false },
			{ link: '/music', forInitialized: false },
			{ link: '/users', forInitialized: false },
			{ link: '/settings', forInitialized: false },
		];

		let menu = navItems.map((item, index) => this.props.isAuth
			? <MenuItem link={item.link} key={index} />
			: !item.forInitialized
				? <MenuItem link={item.link} key={index} />
				: <></>)

		return (
			<nav className={`${s.nav} ${style.block}`}>
				<div className={s.wallpaper}>
					<img src='https://html.crumina.net/html-olympus/img/top-header1.webp' alt='wallpaper'></img>
				</div>
				<div className={s.menu}>
					<div className={s.menuLeft}>
						{this.props.userName
							? menu.splice(0, Math.ceil(menu.length / 2))
							: menu}
					</div>
					{this.props.userName && <>
						<div className={s.userBlock}>
							<div className={s.userPhoto}><img src={photoUrl} alt='userPhoto'></img></div>
							<div className={s.userName}>
								{this.props.userName}
								{aboutMe}
							</div>
						</div>
						<div className={s.menuRight}>
							{menu}
						</div>
					</>}
				</div>

			</nav>
		)
	}
}

export default Navbar;