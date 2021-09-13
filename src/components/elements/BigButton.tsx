import React from 'react'
import s from './BigButton.module.css'

type PropsType = {
	value: string
	disabled?: boolean

	click?: () => void
}

const BigButton: React.FC<PropsType> = ({ value, click, disabled }) => {
	return (
		<div>
			<button className={s.button + ' ' + (value === 'Cancel' ? s.cancel : '')} onClick={click} disabled={disabled}>
				{value}
			</button>
		</div>
	)
}

export default BigButton
