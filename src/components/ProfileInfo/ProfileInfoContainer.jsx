import React from 'react';
import { setProfileData, getUser } from '../../redux/ProfileReducer';
import { connect } from 'react-redux';
import ProfileInfo from './ProfileInfo';
import { getMiId, getMiProfile } from '../../redux/authSelector';
import { getMiProfileFetching } from '../../redux/profileSelector';


class ProfileInfoContainer extends React.Component {
	componentDidMount = () => {
		this.props.getUser(this.props.miId)
	}
	render = () => {
		return <ProfileInfo profile={this.props.profile} setProfileInfo={this.props.setProfileInfo} isFetching={this.props.isFetching} />
	}
}

const mapStateToProps = (store) => ({
	profile: getMiProfile(store),
	isFetching: getMiProfileFetching(store),
	miId: getMiId(store)
})

export default connect(mapStateToProps, { setProfileInfo: setProfileData, getUser })(ProfileInfoContainer);