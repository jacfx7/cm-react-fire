import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/signInActions';

class ProfilePage extends Component {
  componentWillMount() {
    const { auth } = this.props;
  }

  logOutUser = () => {
    debugger;
    this.props.signOut();
  };

  render() {
    return (
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 center-align">
          <img alt="Sign in" id="sign-in" src="/img/user.png" />
          <h4 id="sign-in-header">Sign In to start</h4>
          <a href="#" className="social-signin" onClick={() => this.logOutUser()}>
            <i className="fa fa-google social-signin-icon" />
            Sign Out
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(ProfilePage);
