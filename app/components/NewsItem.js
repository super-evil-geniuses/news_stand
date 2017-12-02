import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import defaultImage from '../public/assets/defaultImage';

import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';
import Share from './Share';

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: props.article,
      favorited: props.favorited,
    };
    this.onAddFavorite = this.onAddFavorite.bind(this);
  }

  onAddFavorite(article) {
    const option = article;
    option.favorited = this.state.favorited;
    axios.post('/favorites', option)
      .then((response) => {
        if (response.data.message === 'favorite added') {
          this.setState({
            article: response.data.article,
            favorited: !this.state.favorited,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="newsItem">
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
              <h3 className="articleTitle"> {this.state.article.title} </h3>
          :
              null
          }
        </Link>
        <FavoriteButton
          article={this.state.article}
          favorited={this.state.favorited}
          onAddFavorite={this.onAddFavorite}
        />
        {
          this.props.article.description ?
            <p className="articleDescription">{this.state.article.description}</p> :
            null
        }

        {
          this.state.article.source.name ?
            <div className="articleSource">{this.state.article.source.name} {this.state.article.author ?
              <p className="articleAuthor">| {this.state.article.author}</p> :
            null}
            </div> :
            null
        }
        <div className="article-bottom-nav">
          <Share article={this.state.article} />
          <CommentsList article={this.state.article} />
        </div>
        <br />
      </div>
    );
  }
}

NewsItem.propTypes = {
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
  favorited: PropTypes.bool.isRequired,
};


export default NewsItem;
