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

const Input = Element('input');

const LoginForm = ({ handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit} className={s.inputBlock}>
			<Field component={Input} validate={required} placeholder='eMail' name='email' />
			<Field component={Input} validate={required} placeholder='Password' name='password' type='password' />
			{error && <div className={s.errorSubmitForm}>{error}</div>}
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
		this.props.logIn(formData.email, formData.password, formData.rememberMe);
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
					<LoginReduxForm onSubmit={this.onSubmit} />
				</div>
			</div >
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { logIn })(Login);