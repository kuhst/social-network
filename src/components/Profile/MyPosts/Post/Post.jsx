import React from 'react';
import s from './Post.module.css'
import style from '../../../../Style.module.css'

const Post = (props) => {
	return (
		<div className={`${s.item} ${style.block}`}>
			<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdS2G0_159FyiX7C5I-ed1aw2Nj_R3t1P9g&usqp=CAU' alt='mainImage'></img>
			{props.message}
			<div>
				<span>{props.counts} Likes </span>
			</div>
		</div>
	)
}

export default Post;