import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './App.css';
import { UserContext } from './UserContext';
import history from './history';
import { Home, Portfolio, Metrics, AboutUs, Profile, Settings, Tutorial, Watchlist } from './pages';
import { NavBar } from './components';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#003D4C',
    },
    secondary: {
      main: "#0044ff",
    },
  },
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = (userId) => {
      this.setState({
        isLoggedIn: true,
        userId: userId,
      })
    }
    this.state = {
      isLoggedIn: false,
      logIn: this.logIn,
      userId: -1,
    }
  }

  render() {
    return (
      <div>
        <UserContext.Provider value = {this.state}>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <Router history={history}>
              {this.state.isLoggedIn && <Redirect from='/' to='/Portfolio' />}
              {!this.state.isLoggedIn && <Redirect from='/' to='/Home' />}
              <Route path='/Home' component={Home} />
              <Route path='/Portfolio' component={Portfolio} />
              <Route path='/Metrics' component={Metrics} />
              <Route path='/AboutUs' component={AboutUs} />
              <Route path='/Profile' component={Profile} />
              <Route path='/Settings' component={Settings} />
              <Route path='/Tutorial' component={Tutorial} />
              <Route path='/Watchlist' component={Watchlist} />
            </Router>
          </MuiThemeProvider>
        </UserContext.Provider>
      </div>
    );  
  }
}

export default App;
