import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import style from '../../../Style.module.css';
import BigButton from '../../elements/BigButton';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Textarea } from '../../elements/FormsControls';
import { PosteType } from '../../../redux/ProfileReducer';

type NewPostFormOunProps = {}
type NewPostFormValuesType = {
	postText: string
}
type NewPostFormValuesTypeKeys = keyof NewPostFormValuesType

const newPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, NewPostFormOunProps>> & NewPostFormOunProps = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={`${style.block} ${s.newPosteBlock}`}>
			<h3>Add post</h3>
			{createField<NewPostFormValuesTypeKeys>('Type new post...', 'postText', [], Textarea)}
			<BigButton value='Sent' />
		</form>
	)
}

const NewPostReduxForm = reduxForm<NewPostFormValuesType, NewPostFormOunProps>({
	form: 'postMessage'
})(newPostForm)

type MyPostsPropsType = {
	posts: Array<PosteType>
	addPost: (postText: string) => void
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
	let postsElement = props.posts.map(p => <Post message={p.message} counts={p.likesCount} key={p.id} />).reverse();
	let onSubmit = (formData: NewPostFormValuesType) => {
		props.addPost(formData.postText)
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

