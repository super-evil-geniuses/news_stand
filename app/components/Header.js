import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const loggedInOrOutLink = props.loggedIn ?
    <a href="/auth/logout">Logout</a> :
    <Link to="/login">Login</Link> ;

  return (
    <div className="header">
      <nav>
        <div className="nav-bar">
          <Link to="/">
            <img src="https://i.imgur.com/mCSoavu.png" alt="news stand" className="logo" />
          </Link>
          <div className="nav-bar">
            <Link to="/profile">Profile</Link>
            {loggedInOrOutLink}
          </div>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
