import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'material-ui/Button';

import Comment from './Comment';

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: props.article.comments || [],
      showComments: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.toggleCommentView = this.toggleCommentView.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.article.comments) {
      this.setState({
        comments: nextProps.article.comments,
      });
    }
  }

  handleCommentSubmit(e) {
    // send post request to add comment to db
    e.preventDefault();

    if (this.state.comment === '') {
      return;
    }

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

  toggleCommentView() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  render() {
    let renderBody;
    if (this.state.showComments) {
      renderBody = (
        <div className="CommentSection">
          <div className="CommentsList">
            {this.state.comments.map((commentObj, idx) => (
              <Comment
                username={commentObj.username}
                comment={commentObj.comment}
                profileImg={commentObj.profileImg}
                commentedAt={commentObj.commentedAt}
                key={idx}
              />
            ))}
          </div>
          <form className="CommentInput" onSubmit={this.handleCommentSubmit}>
            <label id="label">
              Comment:
              <textarea
                id="field" type="text" value={this.state.comment} onChange={this.handleChange}
              />
              <Button raised color="primary" id="submit" type="submit">Submit</Button>
            </label>
          </form>
        </div>
      );
    }
    return (
      <div>
        <Button raised color="primary" id="showComments" onClick={this.toggleCommentView}>
          <img className="commentImg" src="https://image.flaticon.com/icons/svg/54/54761.svg" alt="#" />
          {this.state.comments.length} comment(s)
        </Button>
        { renderBody }
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
    body: PropTypes.array,
    comments: PropTypes.array.isRequired,
    favorites: PropTypes.number.isRequired,
  }).isRequired,
};

export default CommentsList;
