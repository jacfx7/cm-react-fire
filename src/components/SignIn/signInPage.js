import './SignIn.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/signInActions';
import PropTypes from 'prop-types';

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.props.history.push('/profile');
    }
  }

  signInUser = () => {
    this.props.signIn();
  };

  render() {
    return (
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 center-align">
          <img alt="Sign in" id="sign-in" src="/img/user.png" />
          <h4 id="sign-in-header">Sign In to start</h4>
          <a className="social-signin" onClick={() => this.signInUser()}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { signIn }
)(SignIn);
