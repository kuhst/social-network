import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getMiId } from '../../redux/authSelector';
import { getUser } from '../../redux/ProfileReducer';
import { getUserProfile } from '../../redux/profileSelector';
import { AppStateType } from '../../redux/ReduxStore';
import Profile from './Profile';

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
	getUser: (userId: number) => void
}
type PathParamsType = {
	userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToProps

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile = () => {
		let userId: number | null = +this.props.match.params.userId || this.props.miId;
		this.props.getUser(userId as number);
	}

	componentDidMount = () => {
		this.refreshProfile()
	}

	componentDidUpdate = (prevProps: PropsType) => {
		if (this.props.match.params.userId !== prevProps.match.params.userId)
			this.refreshProfile()
	}

	render = () => {
		return <Profile />
	}
}

const mapStateToProps = (state: AppStateType) => {
	return {
		userProfile: getUserProfile(state),
		miId: getMiId(state)
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, { getUser }),
	withRouter,
	withAuthRedirect
)(ProfileContainer)
