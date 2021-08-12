import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { setUserProfile, getUser } from '../../redux/ProfileReducer';
import { setUserPhoto } from '../../redux/AuthReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getUserId, getUserName, getUserSmallPhoto, getUserStatus } from '../../redux/profileSelector';
import { getIsAuth, getMiId, getMiStatus } from '../../redux/authSelector';

class NavbarContainer extends React.Component {
	isMiProfile = () => {
		if (this.props.userId === this.props.miId) return true;
		return false;
	}
	componentDidUpdate = (prevProps) => {
		if (this.isMiProfile()) {
			if (this.props.status !== this.props.miStatus) {
				this.props.getUser(this.props.miId)
			}
		}
	}
	render = () => {
		return <Navbar
			userName={this.props.userName}
			userPhoto={this.props.userPhoto}
			isAuth={this.props.isAuth}
			status={this.props.status}
			isMiProfile={this.isMiProfile()}
			setUserPhoto={this.props.setUserPhoto} />
	}
}

const mapStateToProps = (state) => {
	return {
		userName: getUserName(state),
		userPhoto: getUserSmallPhoto(state),
		status: getUserStatus(state),
		isAuth: getIsAuth(state),
		userId: getUserId(state),
		miId: getMiId(state),
		miStatus: getMiStatus(state)
	}
}

export default compose(
	connect(mapStateToProps, { setUserProfile, getUser, setUserPhoto }),
	withRouter
)(NavbarContainer)