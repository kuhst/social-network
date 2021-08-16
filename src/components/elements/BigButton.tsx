import React from 'react';
import s from './BigButton.module.css';

type PropsType = {
	value: string
	disabled: boolean
	click: () => void
}

const BigButton: React.FC<PropsType> = (props) => {
	return (
		<div >
			<button className={s.button + ' ' + (props.value === 'Cancel' ? s.cancel : '')} onClick={props.click} disabled={props.disabled}>{props.value}</button>
		</div >
	)
}

export default BigButton;

