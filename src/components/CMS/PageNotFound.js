import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page cannot be found</h2>
        </div>
        <Link to="/" className="btn btn-primary btn-lg">
          Go TO Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
