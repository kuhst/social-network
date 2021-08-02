import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import FriendsBlockContainer from './components/Sidebar/FriendsBlock/FriendsBlockContainer';
import ProfileIntroContainer from './components/Sidebar/ProfileIntro/ProfileIntroContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/AppReducer';
import Preloader from './components/elements/Preloader';
import { compose } from 'redux';

class App extends React.Component {
  componentDidMount = () => {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div>
        <HeaderContainer />
        <div className='app-wrapper'>
          <NavbarContainer />
          <div className='app-wrapper-content'>
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/users/:userId?' render={() => <UsersContainer />} />
            <Route path='/settings' component={Settings} />
            <Route path='/login' component={Login} />
          </div>
          <div className='app-wrapper-right'>
            <ProfileIntroContainer />
            <FriendsBlockContainer />
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
