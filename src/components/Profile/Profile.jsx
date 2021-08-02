import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css'


const Profile = (props) => {
	return (
		<div className={s.content}>
			<MyPostsContainer />
		</div>
	)
}

export default Profile;