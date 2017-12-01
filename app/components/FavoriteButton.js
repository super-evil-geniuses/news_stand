import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Heart from 'mui-icons/cmdi/heart';

const FavoriteButton = props => (
  <div>
    <IconButton className="favbtn" onClick={() => props.onAddFavorite(props.article)}>
      <Heart className={props.favorited ? 'favorited' : 'favorite'} /> {props.article.favorites}
    </IconButton>
  </div>
);

export default FavoriteButton;

FavoriteButton.propTypes = {
  onAddFavorite: PropTypes.func.isRequired,
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    favorites: PropTypes.number.isRequired,
  }).isRequired,
  favorited: PropTypes.bool.isRequired,
};
