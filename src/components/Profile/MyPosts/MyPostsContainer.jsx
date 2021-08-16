import { actionsProfileReducer } from '../../../redux/ProfileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { getPosts } from '../../../redux/profileSelector';


const mapStateToProps = (state) => {
	return {
		posts: getPosts(state)
	}
};

const MyPostsContainer = connect(mapStateToProps, { actionsProfileReducer })(MyPosts)

export default MyPostsContainer;