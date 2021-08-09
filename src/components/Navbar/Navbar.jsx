import React from 'react';
import s from './Navbar.module.css';
import style from '../../Style.module.css';
import userPhoto from '../../assets/images/user.jpg';
import MenuItem from './MenuItem';
import iconSliders from '../../assets/images/sliders.svg'
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
	onPhotoChange = (event) => {
		if (event.target.files.length) {
			this.props.setUserPhoto(event.target.files[0]);
		}
	};

	render() {
		let photoUrl = !this.props.userPhoto ? userPhoto : this.props.userPhoto;
		let status = !this.props.status ? '' : <div className={s.status}>{this.props.status}</div>;
		let navItems = [
			{ link: '/profile', forInitialized: true, className: '' },
			{ link: '/dialogs', forInitialized: true, className: '' },
			{ link: '/news', forInitialized: false, className: style.comingSoon },
			{ link: '/music', forInitialized: false, className: style.comingSoon },
			{ link: '/users', forInitialized: false, className: '' },
			{ link: '/settings', forInitialized: false, className: style.comingSoon },
		];

		console.log(this.props.isMiProfile);

		let menu = navItems.map((item, index) => this.props.isAuth
			? <MenuItem link={item.link} key={index} className={item.className} />
			: !item.forInitialized
				? <MenuItem link={item.link} key={index} className={item.className} />
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
								{status}
							</div>
						</div>
						<div className={s.menuRight}>
							{menu}
						</div>
					</>}
				</div>
				<div className={s.photoUpload}>
					<img src={iconSliders} alt='Controls' />
					<div className={s.menuPhoto}>
						<div className={style.block + ' ' + s.container}>
							<label className={s.label}>
								<span className={s.uploadFileText}>Upload profile photo</span>
								<input type='file' onChange={this.onPhotoChange} className={s.uploadFileInput} />
							</label>
							<label>
								<span className={s.uploadFileText + ' ' + style.comingSoon}>Upload header photo</span>
							</label>
						</div>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar;