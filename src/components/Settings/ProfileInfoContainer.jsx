import React from 'react';
import { setProfileInfo, getUser } from '../../redux/ProfileReducer';
import { connect } from 'react-redux';
import ProfileInfo from './ProfileInfo';
import { getMiProfile } from '../../redux/authSelector';
import { getMiProfileFetching } from '../../redux/profileSelector';


const ProfileInfoContainer = ({ setProfileInfo, profile, isFetching }) => {
	return <ProfileInfo profile={profile} setProfileInfo={setProfileInfo} isFetching={isFetching} />
}

const mapStateToProps = (store) => ({
	profile: getMiProfile(store),
	isFetching: getMiProfileFetching(store)
})

export default connect(mapStateToProps, { setProfileInfo, getUser })(ProfileInfoContainer);