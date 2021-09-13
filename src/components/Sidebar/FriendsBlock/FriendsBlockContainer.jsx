import { connect } from 'react-redux';
import { getUserFriends } from '../../../redux/profileSelector';
import FriendBlock from './FriendsBlock';


const mapStateToProps = (state) => {
	return {
		friends: getUserFriends(state),
	}
}

export default connect(mapStateToProps, {})(FriendBlock);