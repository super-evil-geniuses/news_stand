import React from 'react';
import PropsTypes from 'prop-types';
import axios from 'axios';

import Topics from './Topics';
import SelectedSources from './SelectedSources';
import Loader from './Loader';
import NewsList from './NewsList';
import Header from './Header';
import getSources from './helpers/getSources';
import RecommendedList from './RecommendedList';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'publishedAt',
      loading: false,
      recommendedArticles: [],
      articles: [],
      sources: { 
        'techcrunch': {
          label: 'TechCrunch',
          id: 'techcrunch',
          selected: false,
        },
        'cnn': {
          label: 'CNN',
          id: 'cnn',
          selected: false,
        },
        'bloomberg': {
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
      topics: [],
      favorites: [],
    };

    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onRemoval = this.onRemoval.bind(this);
    this.onTopicSearch = this.onTopicSearch.bind(this);
    this.setPreferences = this.setPreferences.bind(this);
    this.getRecommended = this.getRecommended.bind(this);
  }

  componentDidMount() {
    const { topics, sortBy } = this.state;
    const sources = this.parseSources();
    const options = {
      topics, sources, sortBy,
    };
    this.props.getPreferences(options, (articlesAndPreferences) => {
      if (articlesAndPreferences.data.preferences) {
        // if user is logged in
        this.getRecommended();
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

  getRecommended() {
    axios.get('/recommended')
      .then((articles) => {
        this.setState({
          recommendedArticles: articles.data
        });
      });
  };

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
      if (this.props.loggedIn) {
        this.setPreferences()
      } else {
        this.onRefreshClick();
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
    this.setPreferences();
    this.getArticles(options);
  }

  setPreferences() {
    const { topics, sortBy } = this.state;
    const sources = this.parseSources();
    this.setState({loading: true}, () => {

    axios.post('/preferences', { topics, sources })
      .then((message) => {
        this.props.updateUser(message.data)
        this.getArticles({ topics, sources, sortBy })
      })
      .catch(() => {
        console.log('There was an error saving user preferences');
      })})
  }

  toggleArticles() {
    if (this.parseSources().length === 0) {
      return <div className='news-list'><h3 className="message" >Select a source to see the news</h3></div>
    } else if (this.state.loading === true ) {
      return <div className='news-list'><Loader /></div>
    } else {
      return <NewsList newsArticles={this.state.articles} favorites={this.state.favorites} />;
    }
  }

  getArticles(options) {
    this.setState({loading: true});
    this.props.search(options, (newsArticles) => {
      this.setState({ articles: newsArticles }, this.setState({loading: false}));
    });
  }

  render() {
    return (
      <div className='sofie-app'>
        <div className="headerContainer">
          <Header 
            loggedIn={this.props.loggedIn} 
            user={this.props.user}
          />
        </div>

        <div className="contentContainer clearfix">
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
          </div>

          <div className="articlesContainer">
            {this.toggleArticles()}
            <RecommendedList articles={this.state.recommendedArticles}/>
            
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
