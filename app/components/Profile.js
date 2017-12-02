import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import NewsList from './NewsList';

const capitalizeFirstLetter = (string) => {
  const stringArr = string.split(' ');
  return stringArr.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user.username,
      topics: this.props.user.topics,
      selectedSources: this.props.user.selectedSources,
      articles: [],
      img: this.props.user.profileImg,
    };
    this.firstName = this.state.username.split(' ')[0];
    this.lastName = this.state.username.split(' ')[1];
  }

  componentWillMount() {
    axios.get('/favorites')
      .then((response) => {
        this.setState({
          articles: response.data.favorites,
        });
      });
  }

  render() {
    return (
      <div className="profile-container">
        <Header 
          loggedIn={this.props.loggedIn} 
          user={this.props.user}
        />
        <div className="contentContainer">
          <div className="topicsAndSourcesContainer">
            <div className="profile-pg-user">
              <div>
                <img className="profile-pg-profile-img" src={this.props.user.profileImg} alt={this.props.user.username} />
              </div>
              <div className="profile-pg-username">
                {this.props.user.username}
              </div>
            </div>
            <div className="saved-preferences">
              <div className="saved-topics">
                <h4>Saved Topics</h4>
                  {this.props.user.topics.map(topicString => (
                    <li key={topicString}>
                      {capitalizeFirstLetter(topicString)}
                    </li>
                  ))}
              </div>
              <div className="saved-sources">
                <h4>Saved Sources</h4>
                  {this.props.user.selectedSources.map(sourceObj =>
                    <li key={sourceObj.label} >{capitalizeFirstLetter(sourceObj.label)}</li>)}
              </div>
            </div>
          </div>
          <div className="articlesContainer">
            <div className="fav-article-header">
              <h4>Favorited Articles</h4>
            </div>
            
              <NewsList newsArticles={this.state.articles} favorites={this.state.articles} />
            
          </div>
        </div>

      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    selectedSources: PropTypes.arrayOf(PropTypes.object),
    profileImg: PropTypes.string,
  }).isRequired,
};

export default Profile;
