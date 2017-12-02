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
  
  updateUser (newUser) {
    this.setState({ user: newUser});
    console.log(this.state.user);
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
                user={this.state.user}
                updateUser={this.updateUser.bind(this)}
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
              <Profile 
                user={this.state.user}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route
            path="/articles/:id"
            render={({match}) =>
              <FullArticle
                loggedIn={this.state.loggedIn}
                user={this.state.user}
                match={match}
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
