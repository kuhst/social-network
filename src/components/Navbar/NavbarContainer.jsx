import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { setUserProfile } from '../../redux/ProfileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getUserName, getUserSmallPhoto, getUserStatus } from '../../redux/profileSelector';
import { getIsAuth } from '../../redux/authSelector';

class NavbarContainer extends React.Component {
	render = () => {
		return <Navbar
			userName={this.props.userName}
			userPhoto={this.props.userPhoto}
			isAuth={this.props.isAuth}
			status={this.props.status} />
	}
}

const mapStateToProps = (state) => {
	return {
		userName: getUserName(state),
		userPhoto: getUserSmallPhoto(state),
		status: getUserStatus(state),
		isAuth: getIsAuth(state),
	}
}

export default compose(
	connect(mapStateToProps, { setUserProfile }),
	withRouter
)(NavbarContainer)