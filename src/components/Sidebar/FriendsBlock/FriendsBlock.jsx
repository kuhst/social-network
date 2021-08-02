import React from 'react';
import s from './FriendsBlock.module.css'
import style from '../../../Style.module.css'
import FriendItem from './FriendItem/FriendItem';


const FriendBlock = (props) => {
	let friends = props.friends
		.map(f => <FriendItem url={f.avatar} name={f.name} key={f.id} />);
	return (
		<div className={style.block}>
			<div className={style.blockName}>
				Friends ({props.friends.length})
			</div>
			<div className={s.container}>
				{friends}
			</div>
		</div >
	)
}

export default FriendBlock;