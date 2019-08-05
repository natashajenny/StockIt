import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Select, TextField, Typography } from "@material-ui/core";

import { Grapher } from "../components";
import { styles } from "./styles";
import APIClient from "../api/apiClient.js";
import { UserContext } from "../UserContext";

export class PureMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPortfolio: null,
      portfolios: null,
      type: "world",
      start_date: "2009-07-01",
      end_date: "2019-07-01",
      graphData: ""
    };
    this.metricsType = [
      "world",
      "sma",
      "mma",
      "percentage change",
      "volume change",
      "macd",
      "bb",
      "stoch",
      "rsi",
      "adx",
      "cci",
      "aroon",
      "chaikin",
      "mom",
      "dp_pb",
      "trend"
    ];
  }

  handleStocksSelectChange = event => {
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

  handleTypeSelectChange = event => {
    this.setState({ type: event.target.value });
  };

  onStartDateChange = event => {
    this.setState({ start_date: event.target.value });
  };

  onEndDateChange = event => {
    this.setState({ end_date: event.target.value });
  };

  handleSubmit = e => {
    const { type, selectedPortfolio, start_date, end_date } = this.state;
    if (selectedPortfolio.title === "Watchlist") {
      this.apiClient
        .getWatchlistStocks(this.context.user.user_id)
        .then(data => {
          const stocks = data.wl_stocks.map(stock => {
            return stock.company;
          });
          this.apiClient
            .getGraph(
              type === "trend" ? "else" : type,
              stocks,
              start_date,
              end_date
            )
            .then(response => {
              this.setState({ graphData: response.result });
            });
        });
    } else {
      this.apiClient
        .getPortfolioStocks(
          this.context.user.user_id,
          selectedPortfolio.portfolio_id
        )
        .then(data => {
          const stocks = data.portfolio_stocks.map(stock => {
            return stock.company;
          });
          this.apiClient
            .getGraph(
              type === "trend" ? "else" : type,
              stocks,
              start_date,
              end_date
            )
            .then(response => {
              this.setState({ graphData: response.result });
            });
        });
    }
  };

  componentWillMount = () => {
    this.apiClient = new APIClient();
    this.apiClient.getPortfolios(this.context.user.user_id).then(data => {
      data.portfolios.push({ title: "Watchlist", portfolio_id: "0" });
      this.setState({
        portfolios: data.portfolios,
        selectedPortfolio: data.portfolios[0]
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { portfolios } = this.state;

    return (
      <div className={classes.root}>
        <h1> Metrics </h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 0.25fr 0.75fr 1.5fr",
              gridColumnGap: "35px",
              gridRowGrap: "5px",
              alignItems: "center",
              width: "60%"
            }}
          >
            <Typography variant="body1">Stocks in: </Typography>
            <Select
              native
              value={this.state.portfolioName}
              onChange={this.handleStocksSelectChange}
              inputProps={{ name: "portfolioName" }}
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
            <div />
            <Typography variant="body1">Start Date: </Typography>
            <TextField
              id="start_date"
              type="date"
              value={this.state.start_date}
              InputLabelProps={{ shrink: true }}
              className={classes.metricsDateTextField}
              onChange={this.onStartDateChange}
            />
            <Typography variant="body1">Metrics type: </Typography>
            <Select
              native
              value={this.state.metricsType}
              onChange={this.handleTypeSelectChange}
              inputProps={{ name: "metricsType" }}
            >
              {this.metricsType.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <div />
            <Typography variant="body1">End Date: </Typography>
            <TextField
              id="end_date"
              type="date"
              value={this.state.end_date}
              InputLabelProps={{ shrink: true }}
              className={classes.metricsDateTextField}
              onChange={this.onEndDateChange}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
            style={{ width: 100, marginTop: 20 }}
          >
            <Typography variant="button">Submit</Typography>
          </Button>
        </div>
        {this.state.graphData !== "" && (
          <div style={{ maxWidth: "100%", height: "auto" }}>
            <Grapher data={this.state.graphData} />
          </div>
        )}
      </div>
    );
  }
}

PureMetrics.contextType = UserContext;

export const Metrics = withStyles(styles)(PureMetrics);
