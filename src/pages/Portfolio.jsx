import React from 'react';
import { Button, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Refresh, Add } from '@material-ui/icons';

import { PortfolioTable, CreatePortfolioModal } from '../components';
import { styles } from './styles';
import { PortfolioTable } from '../components/PortfolioTable';
import { UserContext } from '../UserContext';
import APIClient from '../api/apiClient.js';

export class PurePortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioName: '',
      portfolios: null,
      openCreatePortfolioModal: false,
    }
  }

  handleSelectChange = (event) => {
    this.setState({
      portfolioName: event.target.value,
    });
    /*TODO: Change the portfolio table data*/
  }

  handleCreatePortfolioClick = () => {
    this.setState({
      openCreatePortfolioModal: true,
    })
  }

  closeCreatePortfolioModal = () => {
    this.setState({
      openCreatePortfolioModal: false,
    })
  }

  handleSubmitPorfolio = (formData) => {
    this.apiClient.addPortfolio(this.context.user.user_id, formData).then(
      (data) => {
        console.log(data)
        this.setState({
          portfolios: data.portfolios
        })
      }
    ).then(
      this.closeCreatePortfolioModal()
    )
  }

  componentDidMount = () => {
    this.apiClient = new APIClient();
    this.context.user && this.apiClient.getPortfolios(this.context.user.user_id)
      .then((data) => {
        this.setState({
          portfolios: data.portfolios
        })
      })
  }

  render() {
    const { classes } = this.props;
    const { portfolios } = this.state;
    return (
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
            {portfolios && portfolios.map(portfolio => 
              <option key={portfolio.portfolio_id} value={portfolio.title}>
                {portfolio.title}
              </option>
            )}
          </Select>
          <Button variant='contained' color='primary' 
                className={classes.refreshButton}>
            <Refresh />
          </Button>
          <Button variant='contained' color='primary' className={classes.addStockButton}>
            <Add />
            Add New Stock
          </Button>
          <Button variant='contained' color='secondary' onClick={this.handleCreatePortfolioClick}>
            Create New Portfolio
          </Button>
        </div>
        <PortfolioTable />
        {this.state.openCreatePortfolioModal && 
            <CreatePortfolioModal onClose={this.closeCreatePortfolioModal}
            onSubmit={this.handleSubmitPorfolio} />}
      </div>
    );
  }
}

PurePortfolio.contextType = UserContext;

export const Portfolio = withStyles(styles)(PurePortfolio);
