import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import style from '../../Style.module.css';
import BigButton from '../elements/BigButton';
import s from './ProfileInfo.module.css';
import { createField, Input, Textarea } from '../elements/FormsControls';
import Preloader from '../elements/Preloader';
import { maxLength, required } from '../../utils/validators';
import { PhotosType, ProfileType } from '../../type/type';

const maxLength1000 = maxLength(1000);
const maxLength30 = maxLength(30);


type ProfileInfoFormOunProps = {
	isFetching: boolean
}

type ProfileInfoType = {
	isFetching: boolean
	profile: ProfileType

	setProfileInfo: (profile: ProfileInfoFormValuesType) => void
}
export type ProfileInfoFormValuesType = ProfileType

type ProfileInfoFormValuesTypeKeys = keyof ProfileInfoFormValuesType


const ProfileInfoForm: React.FC<InjectedFormProps<ProfileInfoFormValuesType, ProfileInfoFormOunProps> & ProfileInfoFormOunProps> = ({ handleSubmit, error, isFetching }) => {
	return (
		<form className={s.form} onSubmit={handleSubmit}>
			<div className={s.profile}>
				{createField<ProfileInfoFormValuesTypeKeys>('', 'fullName', [required, maxLength30], Input, 'Full name', {})}
				{createField<ProfileInfoFormValuesTypeKeys>('', 'aboutMe', [required, maxLength1000], Textarea, 'About me', { rows: 1 })}
			</div>
			<div className={s.job}>
				{createField<ProfileInfoFormValuesTypeKeys>('', 'lookingForAJob', [], Input, 'Looking for a job ', { type: 'checkbox' })}
				{createField<ProfileInfoFormValuesTypeKeys>('', 'lookingForAJobDescription', [required, maxLength1000], Textarea, 'Looking for a job description', { rows: 1 })}
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
			{error && <div className={style.errorSubmitForm}>{error}</div>}
			<div className={s.sendBlock}>
				<BigButton value='Save' />
				<div className={s.preloader}>
					{isFetching && <Preloader />}
				</div>
			</div>
		</form>
	)
}



const ProfileControlReduxForm = reduxForm<ProfileInfoFormValuesType, ProfileInfoFormOunProps>({
	form: 'ProfileInfo'
})(ProfileInfoForm)

class ProfileInfo extends React.Component<ProfileInfoType> {
	onSubmit = (formData: ProfileInfoFormValuesType) => {
		this.props.setProfileInfo(formData);
	}

	render = () => {
		return (
			<div className={style.block}>
				<div className={style.blockName}>
					Personal Information
				</div>
				<ProfileControlReduxForm isFetching={this.props.isFetching} initialValues={this.props.profile} onSubmit={this.onSubmit} />
			</div>
		)
	}
}

export default ProfileInfo;