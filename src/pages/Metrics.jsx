import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup
} from "@material-ui/core";
import update from 'immutability-helper';

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
      graphData: "",
      stocks: null,
      processing: false,
    };
    this.metricsType = [
      "Trend",
      "World",
      "Simple Moving Average(SMA)",
      "Exponential Moving Average(EMA)",
      "Percentage Change",
      "Volume Change",
      "Moving Average Convergence Divergence(MACD)",
      "Bollinger Bands(BB)",
      "Stochastic Oscillator(STOCH)",
      "Relative Strength Index(RSI)",
      "Average Directional Movement Index(ADX)",
      "Commodity Channel Index(CCI)",
      "AROON",
      "Chaikin",
      "Momentum",
      "Dividend Yield and Price to Book Value(DP_PB)",
      "Intraday",
      "Correlation"
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
        this.getStocks(event.target.value);
      }
    }
  };

  getStocks = value => {
    if (value === "Watchlist") {
      this.apiClient
        .getWatchlistStocks(this.context.user.user_id)
        .then(data => {
          this.setState({
            stocks: data.wl_stocks.map(stock => {
              const val = { name: stock.company, selected: true };
              return val;
            })
          });
        });
    } else {
      this.apiClient
        .getPortfolioStocks(
          this.context.user.user_id,
          this.state.selectedPortfolio.portfolio_id
        )
        .then(data => {
          this.setState({
            stocks: data.portfolio_stocks.map(stock => {
              const val = { name: stock.company, selected: true };
              return val;
            })
          });
        });
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

  handleStocksChange = (stock, i) => {
    const newStock = { name: stock.name, selected: !stock.selected };
    this.setState({
      stocks: update(this.state.stocks, { [i]: { $set: newStock } })
    });
  };

  handleSubmit = e => {
    const { type, selectedPortfolio, start_date, end_date } = this.state;
    const stocks = this.state.stocks.filter(stock => stock.selected)
    const stocks_name = stocks.map(stock => stock.name)
    this.setState({
      processing: true
    })
    if (selectedPortfolio.title === "Watchlist") {
      this.apiClient
        .getGraph(
          type === "trend" ? "else" : type,
          0,
          stocks_name,
          start_date,
          end_date
        )
        .then(response => {
          this.setState({ 
            graphData: response.result,
            processing: false,
          });
        });
    } else {
      this.apiClient
        .getGraph(
          type === "trend" ? "else" : type,
          0,
          stocks_name,
          start_date,
          end_date
        )
        .then(response => {
          this.setState({ 
            graphData: response.result,
            processing: false, 
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
      this.getStocks(data.portfolios[0]);
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
              disabled={this.state.type === "Intraday"}
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
              disabled={this.state.type === "Intraday"}
              id="end_date"
              type="date"
              value={this.state.end_date}
              InputLabelProps={{ shrink: true }}
              className={classes.metricsDateTextField}
              onChange={this.onEndDateChange}
            />
          </div>
          <FormGroup row>
            {this.state.stocks &&
              this.state.stocks.map((stock, i) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stock.selected}
                      onChange={() => this.handleStocksChange(stock, i)}
                      value={stock.name}
                      inputProps={{
                        "aria-label": "primary checkbox"
                      }}
                    />
                  }
                  label={stock.name}
                />
              ))}
          </FormGroup>
          <Button
            disabled={this.state.processing}
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
          <div
            style={{
              maxWidth: "100%",
              height: "auto",
              justifyContent: "center"
            }}
          >
            <Grapher data={this.state.graphData} />
          </div>
        )}
      </div>
    );
  }
}

PureMetrics.contextType = UserContext;

export const Metrics = withStyles(styles)(PureMetrics);
