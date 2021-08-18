import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../redux/ReduxStore";

type MapStatePropsType = {
	isAuth: boolean
}
type MapDispatchPropsType = {
}

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
})

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

	const RedirectComponent: React.FC<MapStatePropsType & MapStatePropsType> = (props) => {
		let { isAuth, ...restProps } = props
		if (!isAuth) return <Redirect to='/login' />;
		return <Component {...restProps as WCP} />

	}

	// const connectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

	return connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent);
}