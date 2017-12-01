import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'underscore';

const Header = (props) => {
  // const loggedInOrOutLink = props.loggedIn ?
    // <a href="/auth/logout">Logout</a> :
    // <Link to="/login">Login</Link> ;
  const loginLink = <Link to="/login">Login</Link>;
  const logoutLink = <a href="/auth/logout">Logout</a>;

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img  className="logo-img" src="https://i.imgur.com/mCSoavu.png" alt="news stand" />
        </Link>
      </div>      
      { _.isEmpty(props.user) ?
        <div className="login-link">
          {loginLink}
        </div> :
        <div className="user-stuff"> 
          <div className="profile-pic-nav">
            <Link to="/profile">
              <img className="profile-pic-nav-img" src={props.user.profileImg} alt={props.user.username} />
            </Link>
          </div>
          <div className="user-stuff-text">
            <div className="user-stuff-name">
              <p>Welcome, <Link to="/profile">
                  {props.user.username}!
                </Link>
              </p>
            </div>
            <div className="logout-link">
              {logoutLink}
            </div>
          </div> 
        </div>
      }
      
    </div>
  );
};

// Header.propTypes = {
//   // loggedIn: PropTypes.bool.isRequired,
//   // user: PropTypes.shape({
//   //   username: PropTypes.string.isRequired,
//   //   topics: PropTypes.arrayOf(PropTypes.string),
//   //   selectedSources: PropTypes.arrayOf(PropTypes.object),
//   //   profileImg: PropTypes.string,
//   // }),
// };

export default Header;
