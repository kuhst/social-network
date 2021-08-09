import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import FriendsBlockContainer from './components/Sidebar/FriendsBlock/FriendsBlockContainer';
import ProfileIntroContainer from './components/Sidebar/ProfileIntro/ProfileIntroContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/AppReducer';
import Preloader from './components/elements/Preloader';
import { compose } from 'redux';
import withSuspense from './hoc/withSuspense';

const Login = React.lazy(() => import('./components/Login/Login'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {
  componentDidMount = () => {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div>
        <Route path='/login' render={withSuspense(Login)} />
        <div>
          <HeaderContainer />
          <div className='app-wrapper'>
            <NavbarContainer />
            <div className='app-wrapper-content'>
              <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/news' render={withSuspense(News)} />
              <Route path='/music' render={withSuspense(Music)} />
              <Route path='/users' render={withSuspense(UsersContainer)} />
              <Route path='/settings' render={withSuspense(Settings)} />
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

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
