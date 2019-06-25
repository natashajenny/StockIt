import React from 'react';
import { Button, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { NavBar, PortfolioTable } from '../components';
import { styles } from './styles';

export class PurePortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioName: 'Default'
    }
  }

  handleSelectChange = (event) => {
    this.setState({
      portfolioName: event.target.value,
    });
    /*TODO: Change the portfolio table data*/
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar />
        <div className = {classes.root}>
          <h1> Portfolio </h1>
          <div className = {classes.portfolioSubheading}>
            <Select
              native
              value = { this.state.portfolioName }
              onChange = {this.handleSelectChange}
              inputProps={{
                name: 'portfolioName',
              }}
            >
              <option value='Default'>Default</option>
              <option value='Portfolio 1'>Portfolio 1</option>
              <option value='Portfolio 2'>Portfolio 2</option>
              <option value='Portfolio 3'>Portfolio 3</option>
            </Select>
            <Button variant='contained' color='secondary' className={classes.newPortfolioButton}>
              Create New Portfolio
            </Button>
          </div>
          <PortfolioTable />
        </div>
      </div>
    );
  }
}

export const Portfolio = withStyles(styles)(PurePortfolio);