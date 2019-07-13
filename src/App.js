import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './App.css';
import { UserAuth } from './UserAuth';
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
    this.logIn = () => {
      this.setState({
        isLoggedIn: true
      })
    }
    this.state = {
      isLoggedIn: false,
      logIn: this.logIn,
    }
  }

  render() {
    return (
      <div>
        <UserAuth.Provider value = {this.state}>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <Router history={history}>
              <Route exact path='/' component={Home} />
              <Route path='/Portfolio' component={Portfolio} />
              <Route path='/Metrics' component={Metrics} />
              <Route path='/AboutUs' component={AboutUs} />
              <Route path='/Profile' component={Profile} />
              <Route path='/Settings' component={Settings} />
              <Route path='/Tutorial' component={Tutorial} />
              <Route path='/Watchlist' component={Watchlist} />
            </Router>
          </MuiThemeProvider>
        </UserAuth.Provider>
      </div>
    );  
  }
}

export default App;
