import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../../redux/profileSelector';
import ProfileIntro from './ProfileIntro';

class ProfileIntroContainer extends React.Component {
	render = () => {
		return <ProfileIntro userProfile={this.props.userProfile} />
	}
}

const mapStateToProps = (state) => ({
	userProfile: getUserProfile(state)
})

export default connect(mapStateToProps, {})(ProfileIntroContainer);