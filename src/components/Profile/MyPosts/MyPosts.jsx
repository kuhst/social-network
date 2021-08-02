import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import style from '../../../Style.module.css';
import BigButton from '../../elements/BigButton';
import { Field, reduxForm } from 'redux-form';

const newPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={`${style.block} ${s.newPosteBlock}`}>
			<h3>Add post</h3>
			<Field component='textarea' name='postText' placeholder="Type new post..." />
			<BigButton value='Sent' />
		</form>
	)
}

const NewPostReduxForm = reduxForm({
	form: 'postMessage'
})(newPostForm)

const MyPosts = (props) => {
	let postsElement = props.posts.map(p => <Post message={p.message} counts={p.likesCount} key={p.id} />).reverse();
	let onSubmit = (postText) => {
		props.addPost(postText)
	}

	return (
		<div>
			<NewPostReduxForm onSubmit={onSubmit} />
			<div className={s.posts}>
				{postsElement}
			</div>
		</div >
	)
}

export default MyPosts;

