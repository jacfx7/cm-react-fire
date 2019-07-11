import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Navigation from '../Navigation';

import { withAuthentication } from '../Session';

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="container">
            <div className="justify-content-center">{this.props.children}</div>
          </div>
        </MuiPickersUtilsProvider>
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
