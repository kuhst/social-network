import React from 'react';
import s from './SmallButton.module.css';

type PropsType = {
	value: string
	disabled: boolean
	click: () => void
}

const SmallButton: React.FC<PropsType> = (props) => {
	return (
		<div >
			<button className={s.button + ' ' + (props.value === 'Cancel' ? s.cancel : '')} onClick={props.click} disabled={props.disabled}>{props.value}</button>
		</div >
	)
}

export default SmallButton;

