import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getMiId } from '../../redux/authSelector';
import { getUser } from '../../redux/ProfileReducer';
import { getUserProfile } from '../../redux/profileSelector';
import Profile from './Profile';


class ProfileContainer extends React.Component {
	refreshProfile = () => {
		let id = this.props.match.params.userId || this.props.miId;
		this.props.getUser(id);
	}

	componentDidMount = () => {
		this.refreshProfile()
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.match.params.userId !== prevProps.match.params.userId)
			this.refreshProfile()
	}

	render = () => {
		return <Profile />
	}
}

const mapStateToProps = (state) => {
	return {
		userProfile: getUserProfile(state),
		miId: getMiId(state)
	}
}

export default compose(
	connect(mapStateToProps, { getUser }),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
