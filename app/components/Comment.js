import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => (
  <div className="Comment">
    {props.username}: {props.comment}
  </div>
);

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;
