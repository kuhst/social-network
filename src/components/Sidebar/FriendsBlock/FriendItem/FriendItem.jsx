import React from 'react';
import s from './../FriendsBlock.module.css'


const FriendItem = (props) => {
	return (
		<div className={s.friend}>
			<img src={props.url} alt='avatar'></img>
		</div >
	)
}

export default FriendItem;