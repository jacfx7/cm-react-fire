import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import SingInPage from './components/SignIn/signInPage';
import HomePage from './components/home/homePage';
import requireAuth from './components/auth/requireAuth';
import { fetchUser } from './actions/signInActions';
import ProfilePage from './components/user/profilePage';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SingInPage} />
          <Route path="/profile" component={requireAuth(ProfilePage)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
