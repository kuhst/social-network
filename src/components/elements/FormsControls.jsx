import React from 'react';
import s from './FormsControls.module.css';

const Element = Element => ({ meta, input, ...props }) => {
	const hasErr = meta.touched && meta.error;
	return (
		<div className={s.inputContainer + ' ' + (hasErr ? s.error : '')}>
			<Element {...input} {...props} className={s.input} />
			{props.description ? <span className={s.description}>{props.description}</span> : ''}
			{hasErr && <div className={s.errorMessage}><span>{meta.error}</span></div>}
		</div>
	)
}

export default Element;
