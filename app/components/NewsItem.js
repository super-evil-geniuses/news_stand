import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from '../public/assets/defaultImage';

import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';

const NewsItem = ({ article }) => (
  <div className="newsItem">
    <Link to={{ 
      pathname: '/articles/' + article.title,
    }}>
      {
        article.urlToImage ?
          <img src={article.urlToImage} className="articleImg" alt="#" />
        :
          <img src={defaultImage} className="defaultImg" alt="#" />        
      }
    </Link>
    <FavoriteButton article={article} />
    <Link to={{ 
      pathname: '/articles/' + article.title,
    }}>
    {
      article.title ?
        <a href={article.url} target="_blank">
          <h3 className="articleTitle"> {article.title} </h3>
        </a>
        :
        null
    }
    </Link>
    {
      article.description ?
        <p className="articleDescription">{article.description}</p> :
        null
    }

    {
      article.source.name ?
        <div className="articleSource">{article.source.name} {article.author ?
          <p className="articleAuthor">| {article.author}</p> :
        null}
        </div> :
        null
    }
       
    <CommentsList article={article} />
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
};


export default NewsItem;
