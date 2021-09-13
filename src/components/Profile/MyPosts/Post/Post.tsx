import React, { createElement, useState } from 'react'
import { Comment, Tooltip, Avatar } from 'antd'
import { UserPhotoPlaceholder } from '../../../elements/UserPhotoPlaceholder'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
import s from './Post.module.css'
import style from '../../../../Style.module.css'

type PropsType = {
	message: string
	counts: number
	photoUrl: string | null
}

const Post: React.FC<PropsType> = ({ message, counts, photoUrl }) => {
	const [likes, setLikes] = useState(0)
	const [dislikes, setDislikes] = useState(0)
	const [action, setAction] = useState<'liked' | 'disliked' | null>(null)

	const like = () => {
		setLikes(1)
		setDislikes(0)
		setAction('liked')
	}

	const dislike = () => {
		setLikes(0)
		setDislikes(1)
		setAction('disliked')
	}

	const actions = [
		<Tooltip key='comment-basic-like' title='Like'>
			<span onClick={like}>
				{createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
				<span className='comment-action'>{likes}</span>
			</span>
		</Tooltip>,
		<Tooltip key='comment-basic-dislike' title='Dislike'>
			<span onClick={dislike}>
				{React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
				<span className='comment-action'>{dislikes}</span>
			</span>
		</Tooltip>,
		<span key='comment-basic-reply-to'>Reply to</span>,
	]

	return (
		<div className={`${s.item} ${style.block}`}>
			<Comment
				actions={actions}
				author={<a>My name</a>}
				avatar={<Avatar size='large' src={photoUrl} icon={<UserPhotoPlaceholder />} />}
				content={<p>{message}</p>}
			/>
		</div>
	)
}

export default Post
