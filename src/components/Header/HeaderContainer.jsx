import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setStatus, logOut } from '../../redux/AuthReducer';
import { getIsAuth, getLoadingStatus, getMiId, getMiLogin, getMiPhotoSmall, getMiStatus } from '../../redux/authSelector';


class HeaderContainer extends React.Component {
	render = () => {
		return (
			<Header login={this.props.login}
				status={this.props.status}
				logOut={this.props.logOut}
				isAuth={this.props.isAuth}
				photo={this.props.photo}
				loading={this.props.loading}
				setStatus={this.props.setStatus} />
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: getIsAuth(state),
	userId: getMiId(state),
	login: getMiLogin(state),
	status: getMiStatus(state),
	photo: getMiPhotoSmall(state),
	loading: getLoadingStatus(state),
})

export default connect(mapStateToProps, { setStatus, logOut })(HeaderContainer);