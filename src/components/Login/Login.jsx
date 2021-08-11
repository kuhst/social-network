import React from 'react';
import BigButton from '../elements/BigButton';
import s from './Login.module.css';
import style from '../../Style.module.css';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { logIn } from '../../redux/AuthReducer';
import Element from '../elements/FormsControls';
import { required } from '../../utils/validators';
import { Redirect } from 'react-router-dom';
import { getCaptchaURL, getIsAuth } from '../../redux/authSelector';

const Input = Element('input');

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
	return (
		<form onSubmit={handleSubmit} className={s.inputBlock}>
			<Field component={Input} validate={required} placeholder='eMail' name='email' />
			<Field component={Input} validate={required} placeholder='Password' name='password' type='password' />
			{error && <div className={style.errorSubmitForm}>{error}</div>}
			{captchaURL && <>
				<div className={s.captcha}>
					{console.log(captchaURL)}
					<img src={captchaURL} alt='captcha'></img>
				</div>
				<Field component={Input} validate={required} placeholder='Wrote symbols what you see' name='captcha' />
			</>}
			<div className={s.sendBlock}>
				<Field component={Input} type='checkbox' name='rememberMe' description='Remember me' />
				<BigButton value='Sign in' />
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)

class Login extends React.Component {
	onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state),
	captchaURL: getCaptchaURL(state)
})

export default connect(mapStateToProps, { logIn })(Login);