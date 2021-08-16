import React from 'react'
import BigButton from '../elements/BigButton'
import s from './Login.module.css'
import style from '../../Style.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { logIn } from '../../redux/AuthReducer'
import Element, { createField } from '../elements/FormsControls'
import { required } from '../../utils/validators'
import { Redirect } from 'react-router-dom'
import { getCaptchaURL, getIsAuth } from '../../redux/authSelector'
import { AppStateType } from '../../redux/ReduxStore'

const Input = Element('input');

type LoginFormOunProps = {
	captchaURL: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOunProps> & LoginFormOunProps> = ({ handleSubmit, error, captchaURL }) => {
	return (
		<form onSubmit={handleSubmit} className={s.inputBlock}>
			{createField<LoginFormValuesTypeKeys>('eMail', 'email', [required], Input)}
			{createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, '', { type: 'password' })}
			{error && <div className={style.errorSubmitForm}>{error}</div>}
			{captchaURL && <>
				<div className={s.captcha}>
					{console.log(captchaURL)}
					<img src={captchaURL} alt='captcha'></img>
				</div>

				{createField<LoginFormValuesTypeKeys>('Wrote symbols what you see', 'captcha', [required], Input)}
			</>}
			<div className={s.sendBlock}>
				{createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, 'Remember me', { type: 'checkbox' })}
				<BigButton value='Sign in' />
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOunProps>({
	form: 'login'
})(LoginForm)

type MapStateToPropsType = {
	captchaURL: string | null
	isAuth: boolean
}

type MapDispatchToProps = {
	logIn: (email: string, password: string, rememberMe: boolean, captchaCode: string) => void
}

type LoginType = MapStateToPropsType & MapDispatchToProps

type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormValuesTypeKeys = keyof LoginFormValuesType

class Login extends React.Component<MapStateToPropsType & MapDispatchToProps> {
	onSubmit = (formData: LoginFormValuesType) => {
		this.props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha);
	}

	componentDidMount = () => {
		document.body.style.overflow = 'hidden';
	}


	componentWillUnmount = () => {
		document.body.style.overflow = 'unset';
	}

	pageClose = () => {
		console.log('redirect')
	}

	render = () => {

		if (this.props.isAuth) return <Redirect to={'/profile'} />
		return (
			<div className={s.loginBackground}>
				<div className={style.block + ' ' + s.container}>
					<div className={style.blockName}>Sign in</div>
					<LoginReduxForm onSubmit={this.onSubmit} captchaURL={this.props.captchaURL} />
				</div>
			</div >
		)
	}
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
	isAuth: getIsAuth(state),
	captchaURL: getCaptchaURL(state)
})

export default connect(mapStateToProps, { logIn })(Login);