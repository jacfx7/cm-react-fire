import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutLink from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ authUser }) =>
  authUser ? (
    <NavigationAuth authUser={authUser} />
  ) : (
    <NavigationNonAuth />
  );

const NavigationAuth = ({ authUser }) => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <div className="container-fluid">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <NavLink
            to={ROUTES.LANDING}
            className="nav-link"
            activeClassName="active"
          >
            Landing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={ROUTES.HOME}
            className="nav-link"
            activeClassName="active"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={ROUTES.ACCOUNT}
            className="nav-link"
            activeClassName="active"
          >
            Account
          </NavLink>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <li className="nav-item">
            <NavLink
              to={ROUTES.ADMIN}
              className="nav-link"
              activeClassName="active"
            >
              Admin
            </NavLink>
          </li>
        )}
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <SignOutLink />
        </li>
      </ul>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <div className="container-fluid">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <NavLink
            to={ROUTES.LANDING}
            className="nav-link"
            activeClassName="active"
          >
            Landing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={ROUTES.SIGN_IN}
            className="nav-link"
            activeClassName="active"
          >
            Sign In
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
