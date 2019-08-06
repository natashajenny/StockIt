import React from "react";
import { Route, Router, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import { UserContext } from "./UserContext";
import history from "./history";
import {
  Home,
  Portfolio,
  Metrics,
  AboutUs,
  Profile,
  Settings,
  Watchlist,
  Stocks,
  Stock,
  SearchResult
} from "./pages";
import { NavBar } from "./components";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003D4C"
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = user => {
      console.log(user);
      this.setState({
        isLoggedIn: true,
        user: user
      });
    };
    this.logOut = () => {
      this.setState({
        isLoggedIn: false,
        user: null
      });
    };
    this.handleChangeNotification = event => {
      for (let node of event.target.children) {
        if (node.value === event.target.value) {
          this.setState({
            settings: {
              notification: event.target.value
            }
          });
        }
      }
    };
    this.state = {
      isLoggedIn: true,
      settings: {
        notification: true
      },
      logIn: this.logIn,
      logOut: this.logOut,
      handleChangeNotification: this.handleChangeNotification,
      // user: null
      user: {
        balance: 0,
        dob: null,
        email: "alina.aldhytha@gmail.com",
        gender: null,
        login: "alina",
        name: "Alina Young",
        password: "Hahaha123",
        phone: "450314388",
        portfolios: [16, 17, 19],
        salt: "\xe385c2b0387a1fbfb61e9122b69870e0",
        user_id: 16
      }
    };
  }

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <MuiThemeProvider theme={theme}>
            <NavBar />
            <Router history={history}>
              {!this.state.isLoggedIn && (
                <div>
                  <Redirect from="/Portfolio" to="/Home" />
                  <Redirect from="/Metrics" to="/Home" />
                  <Redirect from="/Profile" to="/Home" />
                  <Redirect from="/Watchlist" to="/Home" />
                </div>
              )}
              {/* <Redirect from="/" to="/Home" /> */}
              <Redirect from="/" to="/Metrics" />
              <Route path="/Home" component={Home} />
              <Route path="/Portfolio" component={Portfolio} />
              <Route path="/Metrics" component={Metrics} />
              <Route path="/AboutUs" component={AboutUs} />
              <Route path="/Profile" component={Profile} />
              <Route path="/Settings" component={Settings} />
              <Route path="/Watchlist" component={Watchlist} />
              <Route path="/search" component={SearchResult} />
              <Route path="/Stocks" exact component={Stocks} />
              <Route path="/Stocks/:stockId" component={Stock} />
            </Router>
          </MuiThemeProvider>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
