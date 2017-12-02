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
      loggedIn: false,
      user: {
        username: 'News Stand',
        topics: [],
        selectedSources: [],
        profileImg: '',
      },
      articles: [],
    };
  }

  componentDidMount() {
    axios.get('/auth')
      .then((authStatus) => {
        this.setState({
          loggedIn: authStatus.data.loggedIn,
          user: authStatus.data.user,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.state;
    if (user !== prevState.user) {
      axios.get('/favorites')
        .then((response) => {
          this.setState({
            articles: response.data.favorites,
          });
        });
    }
  }

  render() {
    return (
      <div className="profile-container">
        <Header 
          loggedIn={this.state.loggedIn}
          user={this.state.user}
        />
        <div className="contentContainer">
          <div className="topicsAndSourcesContainer">
            <div className="profile-pg-user">
              <div>
                <img className="profile-pg-profile-img" src={this.state.user.profileImg} alt={this.state.user.username} />
              </div>
              <div className="profile-pg-username">
                {this.state.user.username}
              </div>
            </div>
            <div className="saved-preferences">
              <div className="saved-topics">
                <h4>Saved Topics</h4>
                  {this.state.user.topics.map(topicString => (
                    <li key={topicString}>
                      {capitalizeFirstLetter(topicString)}
                    </li>
                  ))}
              </div>
              <div className="saved-sources">
                <h4>Saved Sources</h4>
                  {this.state.user.selectedSources.map(sourceObj =>
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
