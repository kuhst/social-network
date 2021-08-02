import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUser } from '../../redux/ProfileReducer';
import { getUserProfile } from '../../redux/profileSelector';
import Profile from './Profile';


class ProfileContainer extends React.Component {
	componentDidMount = () => {
		this.props.getUser(this.props.match.params.userId)
	}
	render = () => {
		return <Profile />
	}
}

const mapStateToProps = (state) => {
	return {
		userProfile: getUserProfile(state),
	}
}

export default compose(
	connect(mapStateToProps, { getUser }),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
