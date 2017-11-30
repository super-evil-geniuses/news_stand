import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Heart from 'mui-icons/cmdi/heart';
import axios from 'axios';

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      numOfFavs: props.article.favorites || 0,
    };
    this.onAddFavorite = this.onAddFavorite.bind(this);
  }

  onAddFavorite(article) {
    axios.post('/favorites', article)
      .then((response) => {
        if (response.data.message === 'favorite added') {
          this.setState({
            favorited: true,
            numOfFavs: response.data.article.favorites,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <IconButton className="favbtn" onClick={() => this.onAddFavorite(this.props.article)}>
          <Heart className={this.state.favorited ? 'favorited' : 'favorite'} /> {this.state.numOfFavs}
        </IconButton>
      </div>
    );
  }
}

export default FavoriteButton;

FavoriteButton.propTypes = {
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
};
