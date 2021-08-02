import React from 'react';
import s from './BigButton.module.css';

const BigButton = (props) => {
	return (
		<div >
			<button className={s.button + ' ' + (props.value === 'Cancel' ? s.cancel : '')} onClick={props.click} disabled={props.disabled}>{props.value}</button>
		</div >
	)
}

export default BigButton;

