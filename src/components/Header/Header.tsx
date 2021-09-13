import React from 'react'
import { NavLink } from 'react-router-dom'
import style from '../../Style.module.css'
import s from './Header.module.css'
import userPhoto from '../../assets/images/user.jpg'
import preloaderImage from '../../assets/images/preloaderPoint.svg'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import { Search } from './Search/Search'
import { Button, Space, Spin } from 'antd'

type PropsType = {
	status: string | null
	photo: string | null
	miName: string | null
	loading: boolean
	isAuth: boolean
	setStatus: (status: string) => void
	logOut: () => void
}

const Header: React.FC<PropsType> = (props) => {
	let preloader = (
		<div className={s.preloader}>
			<img src={preloaderImage} alt='Preloader' />
		</div>
	)

	let statusBlock = <span>{props.status || 'no status'}</span>

	let login = (
		<NavLink to={'/login'}>
			<Button>Log In</Button>
		</NavLink>
	)

	let user = (
		<ul className={s.menuList}>
			<li className={s.menuLink}>
				<div className={s.user}>
					<div className={s.userPhoto}>
						<img src={props.photo ? props.photo : userPhoto} alt='mainImage'></img>
					</div>
					<div className={s.controlBlock}>
						<div className={s.name}>{props.miName}</div>
						<div className={s.status}>{props.loading ? <Spin size='small' /> : statusBlock}</div>
					</div>
					<div className={s.menu}>
						<ProfileMenu status={props.status} setStatus={props.setStatus} logOut={props.logOut} />
					</div>
				</div>
			</li>
		</ul>
	)

	return (
		<header className={s.header}>
			<div className={`${style.container} ${s.container}`}>
				<div className={s.logo}>
					<span className={s.mainName}>SAMURAIS</span>
					<span className={s.secondName}>social network</span>
				</div>
				<div className={s.freeSpace}></div>
				<Space>
					<Search />
					{props.isAuth ? user : login}
				</Space>
			</div>
		</header>
	)
}

export default Header
