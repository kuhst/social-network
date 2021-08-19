import React from 'react';
import { setProfileData, getUser } from '../../redux/ProfileReducer';
import { connect } from 'react-redux';
import ProfileInfo, { ProfileInfoFormValuesType } from './ProfileInfo';
import { getMiId, getMiProfile } from '../../redux/authSelector';
import { getMiProfileFetching } from '../../redux/profileSelector';
import { AppStateType } from '../../redux/ReduxStore';


type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
	setProfileInfo: (profileData: ProfileInfoFormValuesType) => void
	getUser: (userId: number) => void
}

class ProfileInfoContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
	componentDidMount = () => {
		if (this.props.miId) this.props.getUser(this.props.miId)
	}
	render = () => {
		return <ProfileInfo
			profile={this.props.profile}
			setProfileInfo={this.props.setProfileInfo}
			isFetching={this.props.isFetching} />
	}
}

const mapStateToProps = (store: AppStateType) => ({
	profile: getMiProfile(store),
	isFetching: getMiProfileFetching(store),
	miId: getMiId(store)
})

export default connect(mapStateToProps, { setProfileInfo: setProfileData, getUser })(ProfileInfoContainer);