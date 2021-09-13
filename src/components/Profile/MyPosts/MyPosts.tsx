import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import style from '../../../Style.module.css'
import { PosteType } from '../../../redux/ProfileReducer'
import { Formik } from 'formik'
import { Input, Form, SubmitButton } from 'formik-antd'

type MyPostsPropsType = {
	posts: Array<PosteType>
	addPost: (postText: string) => void
}
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
	const submit = (values: { post: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		props.addPost(values.post)
		setSubmitting(false)
	}

	let postsElement = props.posts
		.map((p) => <Post message={p.message} counts={p.likesCount} key={p.id} photoUrl={p.photoUrl} />)
		.reverse()
	return (
		<>
			<div className={style.block}>
				<div className={style.blockName}>Add post</div>
				<Formik initialValues={{ post: '' }} onSubmit={submit}>
					{({ isSubmitting }) => (
						<Form
							style={{
								padding: 20,
								paddingRight: 20,
							}}>
							<div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
								<Input.TextArea
									name='post'
									placeholder='Your post'
									autoSize={{ minRows: 2, maxRows: 6 }}
									onPressEnter={() => submit}
								/>
								<SubmitButton style={{ marginTop: 10 }}>Add post</SubmitButton>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className={s.posts}>{postsElement}</div>
		</>
	)
}

export default MyPosts
