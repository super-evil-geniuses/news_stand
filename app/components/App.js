import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import search from './helpers/search';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import getPreferences from './helpers/getPreferences';
import FullArticle from './FullArticle';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: {},
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


  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <Home
                search={search}
                getPreferences={getPreferences}
                loggedIn={this.state.loggedIn}
              />
            }
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/profile"
            render={() => (
            this.state.loggedIn ? (
              <Profile 
                user={this.state.user} 
                loggedIn={this.state.loggedIn} 
              />
            ) : (
              <Redirect to="/" />
              )
          )}
          />
          <Route
            path="/articles/:id"
            render={() =>
              <FullArticle
                loggedIn={this.state.loggedIn}
              />
            }
          />
          <Route
            component={NotFound}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
