import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import defaultImage from '../public/assets/defaultImage';
import FavoriteButton from './FavoriteButton';
// react routes
  // {article.params.id}

  // {article.params.id}
// const FullArticle = ({ match }) => {
//   console.log(match);
//   return (
//     <div className="full-article">
//     RENDER FULL ARTICLE HERE
//     {match.params.id}<br/>
//     </div>
//   );
// }

class FullArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
    };
  }

  componentDidMount() {
    // pass in match.params.id
    axios.get(`/article/:${this.props.match.params.id}`) //create endpoint to query db for article
      .then((article) => {
        this.setState({
          article: article.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }


  render() {
    return (
      <div className="full-article">
      RENDER FULL ARTICLE HERE
      {this.state.article.data}
      </div> 
    );
  }
}
      // {props.match.params.id}<br/>

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
