import React from 'react';
import { reduxForm } from 'redux-form';
import style from '../../Style.module.css';
import BigButton from '../elements/BigButton';
import s from './ProfileInfo.module.css';
import { createField, Input, Textarea } from '../elements/FormsControls';
import Preloader from '../elements/Preloader';


const ProfileInfoForm = ({ handleSubmit }) => {
	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<div className={s.profile}>
				{createField('', 'fullName', [], Input, 'Full name', {})}
				{createField('', 'aboutMe', [], Textarea, 'About me', { rows: 1 })}
			</div>
			<div className={s.job}>
				{createField('', 'lookingForAJob', [], Input, 'Looking for a job ', { type: 'checkbox' })}
				{createField('', 'lookingForAJobDescription', [], Textarea, 'Looking for a job description', { rows: 1 })}
			</div>
			<div className={s.contacts}>
				{createField('', 'contacts.github', [], Input, 'GitHub', {})}
				{createField('', 'contacts.vk', [], Input, 'VK', {})}
				{createField('', 'contacts.facebook', [], Input, 'Facebook', {})}
				{createField('', 'contacts.instagram', [], Input, 'Instagram', {})}
				{createField('', 'contacts.twitter', [], Input, 'Twitter', {})}
				{createField('', 'contacts.website', [], Input, 'Website', {})}
				{createField('', 'contacts.youtube', [], Input, 'YouTube', {})}
				{createField('', 'contacts.mainLink', [], Input, 'My website', {})}
			</div>
			<div className={s.sendBlock}>
				<BigButton value='Save' />
			</div>
		</form>
	)
}



const ProfileControlReduxForm = reduxForm({
	form: 'ProfileInfo'
})(ProfileInfoForm)

class ProfileInfo extends React.Component {
	onSubmit = (formData) => {
		this.props.setProfileInfo(formData);
	}

	render = () => {
		return (
			<div className={style.block}>
				<div className={style.blockName}>
					Personal Information
				</div>
				{this.props.isFetching
					? <Preloader />
					: <ProfileControlReduxForm initialValues={this.props.profile} onSubmit={this.onSubmit} />}
			</div>
		)
	}
}

export default ProfileInfo;