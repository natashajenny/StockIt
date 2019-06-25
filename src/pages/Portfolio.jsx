import React from 'react';

import { NavBar, PortfolioTable } from '../components';

export class Portfolio extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div>
          <h1> Portfolio </h1>
          <PortfolioTable />
        </div>
      </div>
    );
  }
}
