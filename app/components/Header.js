import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'underscore';

const Header = (props) => {
  const loggedInOrOutLink = props.loggedIn ?
    <a href="/auth/logout">Logout</a> :
    <Link to="/login">Login</Link> ;


  return (
    <div className="header">
        <div className="nav-left">
            <Link to="/">
              <img className="logo" src="https://i.imgur.com/mCSoavu.png" alt="news stand" />
            </Link>
         
          <div className="profile-nav">
          <Link to="/profile">Profile</Link>
          </div>
        </div>
        <div className="nav-right">
          <div className="login-out">
          {loggedInOrOutLink}
          </div>
          { _.isEmpty(props.user) ?
            null :
            <div className="user-stuff"> 
              <div className="profile-pic-nav">
                <img src={props.user.profileImg} alt={props.user.username} />
              </div>
              <div className="user-name">
                <p>Welcome, {props.user.username.split(' ')[0]}
                {props.user.username.split(' ')[1]}!</p>
              </div>
            </div>
          }
        </div>
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
