import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../public/assets/defaultImage';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';
import FullArticle from './FullArticle';

const NewsItem = props => (
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
    <FavoriteButton article={props.article} favorited={props.favorited} />

    {
      props.article.title ?
        <a href={props.article.url} target="_blank">
          <h3 className="articleTitle"> {props.article.title} </h3>
        </a>
        :
        null
    }

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
