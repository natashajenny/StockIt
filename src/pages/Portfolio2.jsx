import React from 'react';
import { Button, Tabs, Tab, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Refresh, Add } from '@material-ui/icons';

import { PortfolioTable, CreatePortfolioModal } from '../components';
import { styles } from './styles';
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

  handleSubmitPorfolio = (e, formData) => {
    e.preventDefault();
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