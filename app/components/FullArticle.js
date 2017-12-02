import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import comedyParser from './helpers/comedyParser';
import defaultImage from '../public/assets/defaultImage';
import FavoriteButton from './FavoriteButton';
import CommentsList from './CommentsList';
import Header from './Header';

class FullArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: 'newspaper',
      favorited: false,
      funny: false,
    };
    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.makeFunny = this.makeFunny.bind(this);
  }

  componentDidMount() {
    axios.get('/article/'+this.props.match.params.id)
      .then((response) => {
        this.setState({
          article: response.data.article,
          favorited: response.data.favorited,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  onAddFavorite(article) {
    const option = article;
    option.favorited = this.state.favorited;
    axios.post('/favorites', option)
      .then((response) => {
        if (response.data.message === 'favorite added') {
          this.setState({
            article: response.data.article,
            favorited: !this.state.favorited,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  makeFunny() {
    this.setState({
      funny: !this.state.funny
    });
  }

  render() {
    let articleBodyParagraphs;
    let articleTitle = this.state.article.title;    
    if (this.state.article.body && this.state.article.body.length > 0) {
      let bodyArray = this.state.article.body;
      if(this.state.funny) {
        bodyArray = comedyParser(this.state.article.body);
        articleTitle = comedyParser([this.state.article.title]);
      }
      articleBodyParagraphs = bodyArray.map((paragraph, idx) =>
        <p key={idx}>{paragraph}</p>
      )
    }
    return (
      <div className="full-article-page">
        <Header
          loggedIn={this.props.loggedIn} 
          user={this.props.user}
        />
        <div className="full-article">
          {
            this.state.article.urlToImage ?
              <img src={this.state.article.urlToImage} className="articleImg" alt="#" />
            :
              <img src={defaultImage} className="defaultImg" alt="#" />        
          }
          <button className='btn-funny' onClick={() => this.makeFunny()}>{this.state.funny ? 'Make serious' : 'Make funny'}</button>
          <FavoriteButton
            article={this.state.article}
            onAddFavorite={this.onAddFavorite}
            favorited={this.state.favorited}
          />
          {
            this.state.article.title ?
              <h3 className="articleTitle"> {articleTitle} </h3>
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
