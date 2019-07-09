import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Navigation from '../Navigation';

import { withAuthentication } from '../Session';

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="justify-content-center">
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default compose(
  withAuthentication,
  connect()
)(App);
