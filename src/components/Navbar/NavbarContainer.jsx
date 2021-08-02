import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { setUserProfile } from '../../redux/ProfileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getUserAboutMe, getUserName, getUserSmallPhoto } from '../../redux/profileSelector';
import { getIsAuth } from '../../redux/authSelector';

class NavbarContainer extends React.Component {
	render = () => {
		return <Navbar
			userName={this.props.userName}
			userPhoto={this.props.userPhoto}
			isAuth={this.props.isAuth}
			aboutMe={this.props.aboutMe} />
	}
}

const mapStateToProps = (state) => {
	return {
		userName: getUserName(state),
		userPhoto: getUserSmallPhoto(state),
		aboutMe: getUserAboutMe(state),
		isAuth: getIsAuth(state),
	}
}

export default compose(
	connect(mapStateToProps, { setUserProfile }),
	withRouter
)(NavbarContainer)