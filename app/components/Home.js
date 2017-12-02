import React from 'react';
import PropsTypes from 'prop-types';
import axios from 'axios';

import Topics from './Topics';
import SelectedSources from './SelectedSources';
import NewsList from './NewsList';
import Header from './Header';
import getSources from './helpers/getSources';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'publishedAt',
      articles: [],
      sources: { 
        techcrunch: {
          label: 'TechCrunch',
          id: 'techcrunch',
          selected: false,
        },
        cnn: {
          label: 'CNN',
          id: 'cnn',
          selected: false,
        },
        bloomberg: {
          label: 'Bloomberg',
          id: 'bloomberg',
          selected: false,
        },
        'abc-news': {
          label: 'ABC News',
          id: 'abc-news',
          selected: false,
        },
        'associated-press': {
          label: 'Associated Press',
          id: 'associated-press',
          selected: false,
        },
    },
      topics: ['net neutrality'],
      favorites: [],
    };

    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onRemoval = this.onRemoval.bind(this);
    this.onTopicSearch = this.onTopicSearch.bind(this);
    this.setPreferences = this.setPreferences.bind(this);
  }

  componentDidMount() {
    const { topics, sortBy } = this.state;
    const sources = this.parseSources();
    const options = {
      topics, sources, sortBy,
    };

    getSources((sources) => {

    })

    this.props.getPreferences(options, (articlesAndPreferences) => {
      if (articlesAndPreferences.data.preferences) {
        // if user is logged in
        let sources = this.state.sources;
        let savedSources = articlesAndPreferences.data.preferences.sources;
        for (const source in sources) {
          sources[source].selected = false;
          for (let i = 0; i < savedSources.length; i++) {
            if (savedSources[i].id === sources[source].id) {
              sources[source].selected = true;
            }
          }
        }
        this.setState({
          topics: articlesAndPreferences.data.preferences.topics,
          favorites: articlesAndPreferences.data.favorites,
          sources: sources,
        });
      }
      this.setState({ articles: articlesAndPreferences.data.articles });
    });
  }

  parseSources() {
    let { sources } = this.state;
    let arr = [];
    for (const source in sources) {
      if (sources[source].selected) {
        arr.push({label: sources[source].label, id: sources[source].id})
      }
    }
    return arr;
  }

  onSourceClick(sourceId, val) {
    let oldState = this.state.sources;
    oldState[sourceId].selected = val;
    this.setState({ sources: oldState}, (data) => {
      this.onRefreshClick();
      if (this.props.loggedIn) {
        this.setPreferences()
      }
    })
  }

  onRefreshClick() {
    const { topics, sortBy } = this.state;
    const sources = this.parseSources();
    const options = {
      topics, sources, sortBy,
    };
    this.getArticles(options);
  }

  onToggleClick() {
    this.setState({ sortBy: this.state.sortBy === 'popularity' ? 'publishedAt' : 'popularity' }, () => {
      const { topics, sortBy } = this.state;
      const sources = this.parseSources();
      const options = {
        topics, sources, sortBy,
      };
      this.getArticles(options);
    });
  }

//can be reformatted to only work for topics
  onRemoval(index, type) {
    const { topics, sortBy } = this.state;
    const sources = this.parseSources();

    if (type === 'topics') {
      topics.splice(index, 1);
      this.setState({ topics });
    } else {
      selectedSources.splice(index, 1);
      this.setState({ selectedSources });
    }

    const options = {
      topics, sources, sortBy,
    };
    this.setPreferences();
    this.getArticles(options);
  }

  onTopicSearch(topic) {
    const { topics, sortBy } = this.state;
    topics.push(topic);
    this.setState({ topics });
    const sources = this.parseSources();

    const options = {
      topics, sources, sortBy,
    };
    console.log(options);
    this.setPreferences();
    this.getArticles(options);
  }

  setPreferences() {
    const { topics } = this.state;
    const sources = this.parseSources();

    axios.post('/preferences', { topics, sources })
      .then((message) => {
        this.props.updateUser(message.data)
        console.log(message);
      })
      .catch(() => {
        console.log('There was an error saving user preferences');
      });
  }

  getArticles(options) {
    this.props.search(options, (newsArticles) => {
      this.setState({ articles: newsArticles });
    });
  }

  render() {
    return (
      <div>
        <div className="headerContainer">
          <Header 
            loggedIn={this.props.loggedIn} 
            user={this.props.user}
          />
        </div>

        <div className="contentContainer">
          <div className="topicsAndSourcesContainer">
            <div>
              <p> Viewing {this.state.sortBy === 'popularity' ? 'most popular' : 'most recent'} news.
              </p>
              <button type="button" className="btn btn-primary" onClick={this.onToggleClick}>{this.state.sortBy === 'popularity' ? 'View most recent' : 'View trending'}
              </button>
            </div>
            <div className="refresh">
              <button
                type="button"
                className="btn btn-primary btn-refresh"
                onClick={this.onRefreshClick}
              >Refresh
              </button>
            </div>
            <Topics
              className="topics"
              topics={this.state.topics}
              onTopicSearch={this.onTopicSearch}
              onRemoval={this.onRemoval}
            />

            <SelectedSources
              onSourceClick={this.onSourceClick.bind(this)}
              sources={this.state.sources}
            />
            <button
              id="savePreferences"
              className="btn btn-primary"
              onClick={this.setPreferences}
            >
              Save Preferences
            </button>
          </div>

          <div className="articlesContainer">
            <NewsList newsArticles={this.state.articles} favorites={this.state.favorites} />
          </div>

        </div>
      </div>
    );
  }
}

Home.propTypes = {
  search: PropsTypes.func.isRequired,
  getPreferences: PropsTypes.func.isRequired,
};

export default Home;
