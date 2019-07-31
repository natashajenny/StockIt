import React from "react";
import { Button, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Refresh, Add } from "@material-ui/icons";

import {
  AddStockModal,
  PortfolioTable,
  CreatePortfolioModal
} from "../components";
import { styles } from "./styles";

import { UserContext } from "../UserContext";
import APIClient from "../api/apiClient.js";

export class PurePortfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioId: "",
      portfolioName: "",
      portfolios: null,
      openCreatePortfolioModal: false,
      isAddingStock: false,
      netGain: 0,
      portfolio_data: null
    };
  }

  handleSelectChange = event => {
    // console.log(event.target.children);
    for (let node of event.target.children) {
      if (node.value === event.target.value) {
        // console.log(node.dataset.id);
        this.setState({
          portfolioId: node.dataset.id,
          portfolioName: event.target.value
        });
      }
    }
  };

  handleAddStock = (e, stock) => {
    e.preventDefault();
    // console.log("add stock");
    this.apiClient
      .addPortfolioStock(
        this.context.user.user_id,
        this.state.portfolioId,
        stock
      )
      .then(data => {
        this.setState({
          portfolio_data: data.portfolio_stocks,
          netGain: data.net_gain
        });
        this.closeAddStockModal();
      });
  };

  handleCreatePortfolioClick = () => {
    this.setState({
      openCreatePortfolioModal: true
    });
  };

  closeCreatePortfolioModal = () => {
    this.setState({
      openCreatePortfolioModal: false
    });
  };

  handleAddStockModalClick = () => {
    this.setState({
      openAddStockModal: true
    });
  };

  closeAddStockModal = () => {
    this.setState({
      openAddStockModal: false
    });
  };

  handleSubmitPorfolio = (e, formData) => {
    e.preventDefault();
    this.apiClient
      .addPortfolio(this.context.user.user_id, formData)
      .then(data => {
        this.setState({
          portfolios: data.portfolios
        });
      })
      .then(this.closeCreatePortfolioModal());
  };

  handleRefreshClick = () => {
    this.apiClient
      .getPortfolioStocks(this.context.user.user_id, this.state.portfolioId)
      .then(data => {
        this.setState({
          portfolio_data: data.portfolio_stocks,
          netGain: data.net_gain
        });
      });
  };

  handleChangePortfolioData = (portfolio_data, netGain) => {
    this.setState({
      portfolio_data: portfolio_data,
      netGain: netGain
    });
  };

  componentDidMount = () => {
    this.apiClient = new APIClient();
    this.context.user &&
      this.apiClient.getPortfolios(this.context.user.user_id).then(data => {
        // console.log(data.portfolios);
        this.setState({
          portfolios: data.portfolios
        });
        data.portfolios &&
          this.setState({
            portfolioId: data.portfolios[0].portfolio_id,
            portfolioName: data.portfolios[0].title
          });

        this.apiClient
          .getPortfolioStocks(
            this.context.user.user_id,
            data.portfolios[0].portfolio_id
          )
          .then(data => {
            this.setState({
              portfolio_data: data.portfolio_stocks,
              netGain: data.net_gain
            });
          });
      });
  };

  render() {
    const { classes } = this.props;
    const { portfolios, portfolio_data, netGain } = this.state;
    // console.log(portfolio_data && portfolio_data.length);
    return (
      <div className={classes.root}>
        <div style={{ display: "flex", width: "100%" }}>
          <h1> Portfolio </h1>
          <div style={{ flex: "1" }} />
          {netGain >= 0 ? (
            <h1 style={{ color: "green" }}> +${netGain} </h1>
          ) : (
            <h1 style={{ color: "red" }}> -${-netGain} </h1>
          )}
        </div>
        <div className={classes.portfolioSubheading}>
          {!portfolios || portfolios.length === 0 ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleCreatePortfolioClick}
            >
              Create New Portfolio
            </Button>
          ) : (
            <div style={{ display: "flex", width: "100%" }}>
              <Select
                native
                value={this.state.portfolioName}
                onChange={this.handleSelectChange}
                inputProps={{
                  name: "portfolioName"
                }}
              >
                {portfolios &&
                  portfolios.map(portfolio => (
                    <option
                      key={portfolio.portfolio_id}
                      data-id={portfolio.portfolio_id}
                      value={portfolio.title}
                    >
                      {portfolio.title}
                    </option>
                  ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                className={classes.refreshButton}
                onClick={this.handleRefreshClick}
              >
                <Refresh />
              </Button>
              <div style={{ flex: "1" }} />
              <Button
                variant="contained"
                color="primary"
                className={classes.addStockButton}
                onClick={this.handleAddStockModalClick}
              >
                <Add />
                Add New Stock
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleCreatePortfolioClick}
              >
                Create New Portfolio
              </Button>
            </div>
          )}
        </div>
        <PortfolioTable
          portfolioId={this.state.portfolioId}
          portfolio_data={portfolio_data}
          netGain={netGain}
          handleChangePortfolioData={this.handleChangePortfolioData}
        />
        {this.state.openCreatePortfolioModal && (
          <CreatePortfolioModal
            onClose={this.closeCreatePortfolioModal}
            onSubmit={this.handleSubmitPorfolio}
          />
        )}
        {this.state.openAddStockModal && (
          <AddStockModal
            onClose={this.closeAddStockModal}
            onSubmit={this.handleAddStock}
          />
        )}
      </div>
    );
  }
}

PurePortfolio.contextType = UserContext;

export const Portfolio = withStyles(styles)(PurePortfolio);
