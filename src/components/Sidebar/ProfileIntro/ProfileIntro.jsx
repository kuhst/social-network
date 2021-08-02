import React from 'react';
import s from './ProfileIntro.module.css'
import style from '../../../Style.module.css'


const ProfileIntro = (props) => {
	return (
		<div className={style.block}>
			<div className={style.blockName}>
				Profile Intro
			</div>
			<div className={s.container}>
				<h4 className="title">About Me:</h4>
				<span className="text">{props.userProfile.aboutMe}</span>
				<h4 className="title">Looking for a job description:</h4>
				<span className="text">{props.userProfile.lookingForAJobDescription}</span>
				<h4 className="title">Contacts:</h4>
				<ul>
					{Object.entries(props.userProfile.contacts).map(([key, value]) => value
						? value.toLowerCase().startsWith("http")
							? <li key={key}><a href={value}>{key}</a></li>
							: <li key={key}><a href={'https://' + value}>{key}</a></li>
						: ' ')}
				</ul>

			</div>
		</div >
	)
}

export default ProfileIntro;