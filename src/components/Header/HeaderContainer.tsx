import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setStatus, logOut } from '../../redux/AuthReducer';
import { getIsAuth, getLoadingStatus, getMiFoolName, getMiId, getMiPhotoSmall, getMiStatus } from '../../redux/authSelector';
import { AppStateType } from '../../redux/ReduxStore';

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
	setStatus: (status: string) => void
	logOut: () => void
}
class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
	render = () => {
		return (
			<Header miName={this.props.miName}
				status={this.props.status}
				logOut={this.props.logOut}
				isAuth={this.props.isAuth}
				photo={this.props.photo}
				loading={this.props.loading}
				setStatus={this.props.setStatus} />
		)
	}
}

const mapStateToProps = (state: AppStateType) => ({
	isAuth: getIsAuth(state),
	userId: getMiId(state),
	miName: getMiFoolName(state),
	status: getMiStatus(state),
	photo: getMiPhotoSmall(state),
	loading: getLoadingStatus(state),
})

export default connect(mapStateToProps, { setStatus, logOut })(HeaderContainer);