import React from 'react';
import BigButton from '../../elements/BigButton';
import s from './../Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import Element from '../../elements/FormsControls';


const Textarea = Element('textarea');

const MessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.messageAdd}>
			<Field component={Textarea} name='textMessage' />
			<BigButton value='Sent' />
		</form>
	)
}

const MessageReduxForm = reduxForm({
	form: 'DialogMessage'
})(MessageForm)

const MessageAdd = (props) => {
	let onSubmit = (formData) => {
		props.addMessage(formData)
	}
	return (
		<div >
			<MessageReduxForm onSubmit={onSubmit} />
		</div>
	)
}

export default MessageAdd;