import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import defaultImage from '../public/assets/defaultImage';

class RecommendedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: props.article,
    };
  }

  render() {
    return (
      <div className="recommended-item">
        <Link to={{
          pathname: `/articles/${this.state.article._id}`,
          }}
        >
          {
            this.state.article.urlToImage ?
              <img src={this.state.article.urlToImage} className="articleImg" alt="#" />
            :
              <img src={defaultImage} className="defaultImg" alt="#" />
          }
          {
            this.props.article.title ?
              <p className="articleTitle"> {this.state.article.title} </p>
          :
              null
          }
        </Link>
        <br />
      </div>
    );
  }
}

RecommendedItem.propTypes = {
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
    comments: PropTypes.array,
    favorites: PropTypes.number.isRequired,
  }).isRequired,
};


export default RecommendedItem;
