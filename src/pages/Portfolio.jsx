import React from "react";
import { Button, Select, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add, SaveAlt } from "@material-ui/icons";
import { CSVLink } from "react-csv";

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
      selectedPortfolio: null,
      portfolios: null,
      openCreatePortfolioModal: false,
      openAddStockModal: false,
      isAddingStock: false,
      netGain: 0,
      portfolio_data: null,
    };
    this.fieldNames = [
      {label: "Code", key: "company"},
      {label: "Purchase Price($)", key: "bought_price"},
      {label: "Current Price($)", key: "adjusted"},
      {label: "Daily Change($)", key: "change"},
      {label: "Daily Change(%)", key: "change_pct"},
      {label: "Daily High($)", key: "high"},
      {label: "Daily Low ($)", key: "low"},
      {label: "Unit Gain ($)", key: "unit_gain"},
      {label: "Total Gain ($)", key: "stock_gain"},
      {label: "Quantity", key: "quantity"}
    ]
  }

  handleSelectChange = event => {
    for (let node of event.target.children) {
      if (node.value === event.target.value) {
        this.setState({
          selectedPortfolio: this.state.portfolios.filter(
            portfolio => portfolio.title === event.target.value
          )[0]
        });
      }
    }
  };

  handleAddStock = (e, stock) => {
    e.preventDefault();
    this.apiClient
      .addPortfolioStock(
        this.context.user.user_id,
        this.state.selectedPortfolio.portfolio_id,
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
          portfolios: data.portfolios,
          openCreatePortfolioModal: false
        });
      })
  };

  handleDownloadClick = () => {
    this.apiClient
      .getPortfolioStocks(
        this.context.user.user_id,
        this.state.selectedPortfolio.portfolio_id
      )
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
        this.setState({
          portfolios: data.portfolios
        });
        data.portfolios &&
          this.setState({
            selectedPortfolio: data.portfolios[0]
          })
        data.portfolios && data.portfolios[0] && this.apiClient
          .getPortfolioStocks(
            this.context.user.user_id,
            data.portfolios[0].portfolio_id
          )
          .then(data =>
            this.setState({
              portfolio_data: data.portfolio_stocks,
              netGain: data.net_gain,
            })
          );
      });
  };

  render() {
    const { classes } = this.props;
    const {
      selectedPortfolio,
      portfolios,
      portfolio_data,
      netGain
    } = this.state;
    return (
      <div className={classes.root}>
        <div style={{ display: "flex", width: "100%" }}>
          <h1> Portfolio </h1>
          <div style={{ flex: "1" }} />
          {netGain >= 0 ? (
            <h1 style={{ color: "green" }}>Net Gain = +${netGain} </h1>
          ) : (
            <h1 style={{ color: "red" }}>Net Loss = -${-netGain} </h1>
          )}
        </div>
        {selectedPortfolio && (
          <Typography variant="body1" style={{ marginBottom: "20px" }}>
            {selectedPortfolio.description}
          </Typography>
        )}
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
              {this.state.portfolio_data && <CSVLink filename={"my-portfolio.csv"} data={this.state.portfolio_data} headers={this.fieldNames} >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.refreshButton}
                  onClick={this.handleDownloadClick}
                >
                  <SaveAlt />
                </Button>
              </CSVLink>}
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
        {selectedPortfolio && (
          <PortfolioTable
            portfolioId={selectedPortfolio.portfolio_id}
            portfolio_data={portfolio_data}
            netGain={netGain}
            handleChangePortfolioData={this.handleChangePortfolioData}
          />
        )}
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
        {/* {this.state.openLoader && <LoadingBar />} */}
      </div>
    );
  }
}

PurePortfolio.contextType = UserContext;

export const Portfolio = withStyles(styles)(PurePortfolio);
