import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Comment = props => (
  <div className="Comment">
    <img src={props.profileImg} className="profileImg" alt="#" />
    <div className="username">{props.username}</div>
    <div className="commentedAt">{moment(props.commentedAt).fromNow()}</div>
    <div className="comment">{props.comment}</div>
  </div>
);

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
  commentedAt: PropTypes.number.isRequired,
};

export default Comment;
