import React from 'react'
import BigButton from '../elements/BigButton'
import s from './Login.module.css'
import style from '../../Style.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../redux/AuthReducer'
import Element, { createField } from '../elements/FormsControls'
import { required } from '../../utils/validators'
import { Redirect } from 'react-router-dom'
import { getCaptchaURL, getIsAuth } from '../../redux/authSelector'
import { useEffect } from 'react'
import { useState } from 'react'
import { notification } from 'antd'
import { isSafari } from 'react-device-detect'

const Input = Element('input')

type LoginFormOunProps = {
	captchaURL: string | null
}

type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormValuesTypeKeys = keyof LoginFormValuesType

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOunProps> & LoginFormOunProps> = ({
	handleSubmit,
	error,
	captchaURL,
}) => {
	return (
		<form onSubmit={handleSubmit} className={s.inputBlock}>
			{createField<LoginFormValuesTypeKeys>('eMail', 'email', [required], Input)}
			{createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, '', { type: 'password' })}
			{error && <div className={style.errorSubmitForm}>{error}</div>}
			{captchaURL && (
				<>
					<div className={s.captcha}>
						<img src={captchaURL} alt='captcha'></img>
					</div>

					{createField<LoginFormValuesTypeKeys>('Wrote symbols what you see', 'captcha', [required], Input)}
				</>
			)}
			<div className={s.sendBlock}>
				{createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, 'Remember me', {
					type: 'checkbox',
				})}
				<BigButton value='Sign in' />
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOunProps>({
	form: 'login',
})(LoginForm)

const openNotification = () => {
	let keys = []
	if (isSafari) {
		keys.push('safari')
		const safariMessage = {
			message: 'Warning',
			description: 'Sorry, you cant use Safari for login, please use any other browser',
			duration: 0,
			key: keys[0],
		}
		notification.open(safariMessage)
	} else {
		keys.push('notification 1', 'notification 2', 'notification 3')
		const args1 = {
			message: 'Authorization',
			description: 'You can use login and password bellow to view functionality',
			duration: 0,
			key: keys[0],
		}
		const args2 = {
			message: 'Login',
			description: 'x1oke@wimsg.com',
			duration: 0,
			key: keys[1],
		}
		const args3 = {
			message: 'Password',
			description: '12345',
			duration: 0,
			key: keys[2],
		}
		notification.open(args1)
		setTimeout(() => notification.open(args2), 1000)
		setTimeout(() => notification.open(args3), 2000)
	}
	return keys
}

export const LoginPage = () => {
	const [isActive, setIsActive] = useState(true)

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	})

	useEffect(() => {
		const keys = openNotification()
		return () => {
			keys.forEach((key) => notification.close(key))
		}
	}, [])

	const isAuth = useSelector(getIsAuth)
	const captchaURL = useSelector(getCaptchaURL)

	const dispatch = useDispatch()

	const onSubmit = (formData: LoginFormValuesType) => {
		dispatch(logIn(formData.email, formData.password, formData.rememberMe, formData.captcha))
	}

	if (isAuth) return <Redirect to={'/profile'} />
	return (
		<div className={s.loginBackground}>
			<div className={style.block + ' ' + s.container}>
				<div className={style.blockName}>Sign in</div>
				<LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
			</div>
		</div>
	)
}
