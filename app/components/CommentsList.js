import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Comment from './Comment';

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: 'Anonymous', // hardcoded for testing purposes
      comment: '',
      comments: props.article.comments,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit(e) {
    // send post request to add comment to db
    e.preventDefault();

    const commentObj = {
      article: this.props.article,
      comment: this.state.comment,
    };

    axios.post('/comments', commentObj)
      .then((response) => {
        if (response.data.message === 'comment added') {
          this.setState({
            comment: '',
            comments: response.data.article.comments,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
        {this.state.comments.map((commentObj, idx) => (
          <Comment username={commentObj.username} comment={commentObj.comment} key={idx} />
        ))}
      </div>
    );
  }
}

CommentsList.propTypes = {
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    body: PropTypes.string,
    comments: PropTypes.array.isRequired,
    favorites: PropTypes.number.isRequired,
  }).isRequired,
};

export default CommentsList;
