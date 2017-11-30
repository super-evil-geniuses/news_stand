import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../public/assets/defaultImage';

import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';

const NewsItem = props => (
  <div className="newsItem">
    <Link to={{ 
      pathname: '/articles/' + props.article._id,
    }}>
      {
        props.article.urlToImage ?
          <img src={props.article.urlToImage} className="articleImg" alt="#" />
        :
          <img src={defaultImage} className="defaultImg" alt="#" />        
      }
    {
      props.article.title ?
        <h3 className="articleTitle"> {props.article.title} </h3>
    :
        null
    }
    </Link>
    <FavoriteButton article={props.article} favorited={props.favorited} />
    {
      props.article.description ?
        <p className="articleDescription">{props.article.description}</p> :
        null
    }

    {
      props.article.source.name ?
        <div className="articleSource">{props.article.source.name} {props.article.author ?
          <p className="articleAuthor">| {props.article.author}</p> :
        null}
        </div> :
        null
    }
    <CommentsList article={props.article} />
    <br />
  </div>
);

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
  }).isRequired,
  favorited: PropTypes.bool.isRequired,
};


export default NewsItem;
