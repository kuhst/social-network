import React from 'react';
import { connect } from 'react-redux';
import { follow, setPageToCurrent, setUsers, setUsersCount, unfollow, toggleIsFollowing, responseUsers } from '../../redux/UsersReducer';
import Users from './Users';
import Preloader from '../elements/Preloader';
import { getCurrentPage, getIsFetching, getIsFollowing, getUsers, getUsersCount, getUsersCountOnPage } from '../../redux/usersSelector';


class UsersAPIComponent extends React.Component {
	componentDidMount = () => {
		this.props.responseUsers(this.props.usersCountOnPage, this.props.currentPage);
	}
	onPageChanged = (pageNumber) => {
		this.props.responseUsers(this.props.usersCountOnPage, pageNumber);
	}
	render = () => {
		return <>
			{this.props.isFetching
				? <Preloader />
				: <Users {...this.props}
					onPageChanged={this.onPageChanged}
				/>
			};
		</>;
	}
}

const mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		usersCount: getUsersCount(state),
		usersCountOnPage: getUsersCountOnPage(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		isFollowing: getIsFollowing(state),
	}
}

const UsersContainer = connect(mapStateToProps, {
	follow, unfollow, setUsers,
	setPageToCurrent, setUsersCount,
	toggleIsFollowing, responseUsers
})(UsersAPIComponent);

export default UsersContainer;