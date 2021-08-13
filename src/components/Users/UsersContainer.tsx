import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, responseUsers } from '../../redux/UsersReducer';
import Users from './Users';
import Preloader from '../elements/Preloader';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getUsers, getUsersCount, getUsersCountOnPage } from '../../redux/usersSelector';
import { AppStateType } from '../../redux/ReduxStore';
import { UserType } from '../../type/type';

type MapStatePropsType = {
	usersCountOnPage: number
	currentPage: number
	isFetching: boolean
	usersCount: number
	users: Array<UserType>
	followingInProgress: Array<number>
}

type MapDispatchToProps = {
	responseUsers: (usersCountOnPage: number, currentPage: number) => void
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchToProps

class UsersAPIComponent extends React.Component<PropsType> {
	componentDidMount = () => {
		this.props.responseUsers(this.props.usersCountOnPage, this.props.currentPage);
	}
	onPageChanged = (pageNumber: number) => {
		this.props.responseUsers(this.props.usersCountOnPage, pageNumber);
	}
	render = () => {
		return <>
			{this.props.isFetching
				? <Preloader />
				: <Users usersCount={this.props.usersCount}
					usersCountOnPage={this.props.usersCountOnPage}
					currentPage={this.props.currentPage}
					users={this.props.users}
					followingInProgress={this.props.followingInProgress}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					onPageChanged={this.onPageChanged}
				/>
			};
		</>;
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		usersCount: getUsersCount(state),
		usersCountOnPage: getUsersCountOnPage(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}

const UsersContainer = connect<MapStatePropsType, MapDispatchToProps, void, AppStateType>(
	mapStateToProps, { follow, unfollow, responseUsers }
)(UsersAPIComponent);

export default UsersContainer;