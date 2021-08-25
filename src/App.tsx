import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import FriendsBlockContainer from "./components/Sidebar/FriendsBlock/FriendsBlockContainer";
import ProfileIntroContainer from "./components/Sidebar/ProfileIntro/ProfileIntroContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { connect } from "react-redux";
import { initializeApp } from "./redux/AppReducer";
import Preloader from "./components/elements/Preloader";
import { compose } from "redux";
import withSuspense from "./hoc/withSuspense";
import { AppStateType } from "./redux/ReduxStore";

const LoginPage = React.lazy(() =>
  import("./components/Login/LoginPage").then(({ LoginPage }) => ({
    default: LoginPage,
  }))
);
const ProfileInfoContainer = React.lazy(
  () => import("./components/ProfileInfo/ProfileInfoContainer")
);
const News = React.lazy(() => import("./components/News/News"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));
const Music = React.lazy(() => import("./components/Music/Music"));
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"));

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedUsers = withSuspense(UsersPage);
const SuspendedLogin = withSuspense(LoginPage);
const SuspendedProfileInfo = withSuspense(ProfileInfoContainer);

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
  componentDidMount = () => {
    this.props.initializeApp();
  };
  render() {
    if (!this.props.initialized) return <Preloader />;

    return (
      <div>
        <Route path='/login' render={() => <SuspendedLogin />} />
        <div>
          <HeaderContainer />
          <div className='app-wrapper'>
            <NavbarContainer />
            <div className='app-wrapper-content'>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => <Redirect to='/profile' />}
                />
                <Route path='/dialogs' render={() => <SuspendedDialogs />} />
                <Route
                  path='/profile/settings'
                  render={() => <SuspendedProfileInfo />}
                />
                <Route
                  path='/profile/:userId?'
                  render={() => <ProfileContainer />}
                />
                <Route path='/news' render={withSuspense(News)} />
                <Route path='/music' render={withSuspense(Music)} />
                <Route path='/users' render={() => <SuspendedUsers />} />
                <Route path='/settings' render={withSuspense(Settings)} />
              </Switch>
            </div>
            <div className='app-wrapper-right'>
              <ProfileIntroContainer />
              <FriendsBlockContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
