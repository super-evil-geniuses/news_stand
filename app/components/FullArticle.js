import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../public/assets/defaultImage';

import FavoriteButton from './FavoriteButton';
// react routes

  // {article.params.id}
const FullArticle = ({ match }) => {
  console.log(match);
  return (
    <div className="full-article">
    RENDER FULL ARTICLE HERE
    {match.params.id}<br/>
    </div>
  );
}

// const FullArticle = (props) => {
//   console.log(props);
//   return (
//     <div className="full-article">
//     RENDER FULL ARTICLE HERE
//     {props.match.params.id}<br/>
//     {props.location.state}
//     </div>
//   );
// }

// const Player = (props) => {
//   const player = PlayerAPI.get(
//     parseInt(article.match.params.id, 10)
//   )
//   if (!player) {
//     return <div>Sorry, but the player was not found</div>
//   }
//   return (
//     <div>
//       <h1>{player.name} (#{player.number})</h1>
//       <h2>{player.position}</h2>
//     </div>
// )

FullArticle.propTypes = {
  // article: PropTypes.shape({
  //   urlToImage: PropTypes.string,
  //   title: PropTypes.string,
  //   description: PropTypes.string,
  //   source: PropTypes.shape({
  //     name: PropTypes.string,
  //   }),
  //   author: PropTypes.string,
  //   url: PropTypes.string.isRequired,
  // }).isRequired,
};


export default FullArticle;
