import React from 'react';
import { Field } from 'redux-form';
import s from './FormsControls.module.css';


const Element = Element => ({ meta, input, ...props }) => {
	const hasErr = meta.touched && meta.error;
	return (
		<div className={s.inputContainer + ' ' + (hasErr ? s.error : '')}>
			<Element {...input} {...props} className={s.input} />
			{props.description ? <span className={s.description}>{props.description}</span> : ''}
			{hasErr && <div className={s.errorMessage}>{meta.error}</div>}
		</div>
	)
}

export const Input = Element('input');

export const Textarea = Element('textarea');

export const createField = (placeholder, name, validators, component, description = '', props = {}) => (
	<div>
		<Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} description={description} />
	</div>
)


export default Element;
