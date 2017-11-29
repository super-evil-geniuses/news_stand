import React from 'react';
// import PropTypes from 'prop-types';

import Comment from './Comment';

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit(e) {
    // send post request to add comment to db
    e.preventDefault();
    this.state.comments.push(this.state.comment);
    this.setState({
      comments: this.state.comments,
    });
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  render() {
    return (
      <div className="CommentsList">
        <form onSubmit={this.handleCommentSubmit}>
          <label>
            Comment:
            <input type="text" value={this.state.comment} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.comments.map((comment, idx) => (
          <Comment comment={comment} key={comment + idx} />
        ))}
      </div>
    );
  }
}

export default CommentsList;
