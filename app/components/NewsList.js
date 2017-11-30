import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'node-uniq';

import NewsItem from './NewsItem';
// import FullArticle from './FullArticle';
// import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

// Link is your replacement for anchor tags.
// Route is the conditionally shown component based on matching a path to a URL.

const NewsList = props => (
  <div className="news-list">
    {props.newsArticles.length === 0 ?
      <div id="no-articles">No articles found. Please try another search</div> :
      props.newsArticles && uniq(props.newsArticles, i => i.url)
        .map((article) => {
          let favorited = false;
          props.favorites.forEach((favArticle) => {
            if (article.url === favArticle.url) {
              favorited = true;
            }
          });
          return <NewsItem article={article} key={article.url} favorited={favorited} />;
        })
    }
  </div>
);

NewsList.propTypes = {
  newsArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewsList;
