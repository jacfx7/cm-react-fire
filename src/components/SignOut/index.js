import React from 'react';

import { withFirebase } from '../Firebase';

/* const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
); */

const SignOutLink = ({ firebase }) => (
  <div className="nav-link">
    <i className="fa fa-sign-out" />
    {/* eslint-disable-next-line */}
    <a onClick={firebase.doSignOut}> Sign Out</a>
  </div>
);

export default withFirebase(SignOutLink);
