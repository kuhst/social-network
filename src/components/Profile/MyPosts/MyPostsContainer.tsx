import { actionsProfileReducer } from '../../../redux/ProfileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/profileSelector';
import { AppStateType } from '../../../redux/ReduxStore';


const mapStateToProps = (state: AppStateType) => {
	return {
		posts: getPosts(state)
	}
};

const MyPostsContainer = connect(mapStateToProps, { addPost: actionsProfileReducer.addPost })(MyPosts)

export default MyPostsContainer;