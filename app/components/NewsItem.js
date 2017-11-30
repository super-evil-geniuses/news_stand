import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../public/assets/defaultImage';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';
import FullArticle from './FullArticle';

const NewsItem = ({ article }) => (
  <div className="newsItem">
    <Link to={{ 
      pathname: '/articles/' + article.title,
      state: 'article',
    }}>
      {
        article.urlToImage ?
            <img src={article.urlToImage} className="articleImg" alt="#" />

          :

            <img src={defaultImage} className="defaultImg" alt="#" />        
      }
    </Link>
    <FavoriteButton article={article} />
    {
      article.title ?
        <a href={article.url} target="_blank">
          <h3 className="articleTitle"> {article.title} </h3>
        </a>
        :
        null
    }

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
