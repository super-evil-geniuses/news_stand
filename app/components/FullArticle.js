import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import defaultImage from '../public/assets/defaultImage';
import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';

class FullArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: 'newspaper',
    };
  }

  componentDidMount() {
    axios.get('/article/'+this.props.match.params.id)
      .then((response) => {
        this.setState({
          article: response.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    let articleBodyParagraphs;
    if (this.state.article.body && this.state.article.body.length > 0) {
      articleBodyParagraphs = this.state.article.body.map((paragraph, idx) =>
        <p key={idx}>{paragraph}</p>
      )
    }
    return (
      <div className="full-article">

      {
        this.state.article.urlToImage ?
          <img src={this.state.article.urlToImage} className="articleImg" alt="#" />
        :
          <img src={defaultImage} className="defaultImg" alt="#" />        
      }
      <FavoriteButton article={this.state.article} />
      {
        this.state.article.title ?
          <h3 className="articleTitle"> {this.state.article.title} </h3>
        :
        null
      }
      {
        this.state.article.body ?
          <div className="articleDescription">{articleBodyParagraphs}</div> :
          <div className="articleDescription">{this.state.article.description}</div> 
      }

      {
        this.state.article.source ?
          <div className="articleSource">{this.state.article.source.name} {this.state.article.author ?
            <p className="articleAuthor">| {this.state.article.author}</p> :
          null}
          </div> :
          null
      }  

    <CommentsList article={this.state.article} />

      </div> 
    );
  }
}

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
