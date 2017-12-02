import React from 'react';
import PropTypes from 'prop-types';

import RecommendedItem from './RecommendedItem';

const RecommendedList = (props) => {
  return (
    <div className='recommended-list'>
      {props.articles.length === 0 ?
        <div id="no-articles" /> :
        <div>
        <h5>Recommended For You</h5>
          {props.articles.map(article => <RecommendedItem article={article.article} key={`${article.article.url}recommended`} />)}
        </div>}
    </div>
  )
};

RecommendedList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecommendedList;