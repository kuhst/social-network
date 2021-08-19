import React from 'react';
import s from './Post.module.css'
import style from '../../../../Style.module.css'

type PropsType = {
	message: string
	counts: number
}

const Post: React.FC<PropsType> = ({ message, counts }) => {
	return (
		<div className={`${s.item} ${style.block}`}>
			<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdS2G0_159FyiX7C5I-ed1aw2Nj_R3t1P9g&usqp=CAU' alt='mainImage'></img>
			{message}
			<div>
				<span>{counts} Likes </span>
			</div>
		</div>
	)
}

export default Post;