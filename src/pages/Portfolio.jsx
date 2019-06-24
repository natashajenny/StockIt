import React from 'react';
import { NavBar } from '../components';
import { SimpleTable } from '../components';

export class Portfolio extends React.Component {
  render() {
    return (
      <div>
          <NavBar />
          <h1> Portfolio </h1>
          <SimpleTable />
      </div>
    );
  }
}
