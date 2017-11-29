import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => (
  <div className="Comment">
    User: {props.comment}
  </div>
);

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default Comment;
