import React from 'react';
import s from './../Dialogs.module.css'

const MessageItem = (props) => {
	return (
		<div className={s.message + ' ' + ((props.from === 'mi') ? s.mi : s.friend)}>
			{props.message}
		</div>
	)
}

export default MessageItem;