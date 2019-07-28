import React from 'react';
import { Button, Select } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Refresh, Add } from '@material-ui/icons';

import { AddStockModal, PortfolioTable, CreatePortfolioModal } from '../components';
import { styles } from './styles';

import { UserContext } from '../UserContext';
import APIClient from '../api/apiClient.js';

export class PurePortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioId: '',
      portfolioName: '',
      portfolios: null,
      openCreatePortfolioModal: false,
      isAddingStock: false,
    }
  }

  handleSelectChange = (event) => {
    for (let node of event.target.children) {
      if (node.value === event.target.value) {
        this.setState({
          portfolioId: node.getAttribute('data-id'),
          portfolioName: event.target.value,
        });
      }
    }
    /*TODO: Change the portfolio table data*/
  }

  handleAddStock = (e, stock) => {
    e.preventDefault();
    this.apiClient.addPortfolioStock(
      this.context.user.user_id,
      this.state.portfolioId,
      stock
    ).then((data) => {
      this.closeAddStockModal();
    })
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

  handleAddStockModalClick = () => {
    this.setState({
      openAddStockModal: true,
    })
  }

  closeAddStockModal = () => {
    this.setState({
      openAddStockModal: false,
    })
  }
  
  handleSubmitPorfolio = (e, formData) => {
    e.preventDefault();
    this.apiClient.addPortfolio(this.context.user.user_id, formData).then(
      (data) => {
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
        console.log(data.portfolios);
        this.setState({
          portfolios: data.portfolios,
          portfolioId: data.portfolios[0].portfolio_id,
          portfolioName: data.portfolios[0].title,
        })
      })
  }

  render() {
    const { classes } = this.props;
    const { portfolios } = this.state;
    // console.log(this.state.portfolioId);
    // console.log(this.state.portfolioName);
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
              <option key={portfolio.portfolio_id} 
                      data-id= {portfolio.portfolio_id}
                      value={portfolio.title}>
                {portfolio.title}
              </option>
            )}
          </Select>
          <Button variant='contained' color='primary' 
                className={classes.refreshButton}>
            <Refresh />
          </Button>
          <Button variant='contained' color='primary' className={classes.addStockButton}
              onClick={this.handleAddStockModalClick}>
            <Add />
            Add New Stock
          </Button>
          <Button variant='contained' color='secondary' onClick={this.handleCreatePortfolioClick}>
            Create New Portfolio
          </Button>
        </div>
        <PortfolioTable portfolioId={this.state.portfolioId}/>
        {this.state.openCreatePortfolioModal && 
            <CreatePortfolioModal onClose={this.closeCreatePortfolioModal}
            onSubmit={this.handleSubmitPorfolio} />}
        {this.state.openAddStockModal &&
            <AddStockModal onClose = {this.closeAddStockModal} 
            onSubmit={this.handleAddStock} />}
      </div>
    );
  }
}

PurePortfolio.contextType = UserContext;

export const Portfolio = withStyles(styles)(PurePortfolio);
