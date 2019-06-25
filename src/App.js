import React from 'react';
import { Route, Router } from 'react-router-dom';

import history from './history';
import { Portfolio, Metrics, AboutUs, Profile, Settings, Tutorial, Watchlist } from './pages';
import './App.css';

function App () {
  return (
    <div>
      <Router history={history}>
        <Route exact path='/' component={Portfolio} />
        <Route path='/Portfolio' component={Portfolio} />
        <Route path='/Metrics' component={Metrics} />
        <Route path='/AboutUs' component={AboutUs} />
        <Route path='/Profile' component={Profile} />
        <Route path='/Settings' component={Settings} />
        <Route path='/Tutorial' component={Tutorial} />
        <Route path='/Watchlist' component={Watchlist} />
      </Router>
    </div>
  );
}

export default App;
