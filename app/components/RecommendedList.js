import React from 'react';
import PropTypes from 'prop-types';

import RecommendedItem from './RecommendedItem';

const RecommendedList = props => (
  <div className="recommended-list">
  <h5>Recommended For You</h5>
    {props.articles.length === 0 ?
      <div id="no-articles" /> :
    props.articles.map(article => <RecommendedItem article={article.article} key={`${article.article.url}recommended`} />)}
  </div>
);

RecommendedList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecommendedList;
