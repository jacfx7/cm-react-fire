import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        HOME:
        <NavLink to="/signin" className="nav-link" activeClassName="active">
          Sign In
        </NavLink>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
