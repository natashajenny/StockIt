import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { styles } from "./styles";
import { StockDrawer, Grapher } from "../components";
import APIClient from "../api/apiClient.js";
import * as stockCodes from "../mock/stock_code.js";
import { UserContext } from "../UserContext";

export class SingleStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      openDrawer: false,
      isLoaded: false,
      graphData: ""
    };
  }

  handleDrawerOpen = () => {
    this.setState({
      openDrawer: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      openDrawer: false
    });
  };

  getPredictionDates = calendar_date => {
    var month = calendar_date.getMonth();
    var start_month = "";
    var end_month = "";
    if (month < 10) {
      start_month = ("0" + month).slice(-2);
      if (month < 9) end_month = ("0" + (month + 1)).slice(-2);
      else end_month = month + 1;
    } else start_month = month;

    var date = calendar_date.getDate();
    if (date < 10) date = ("0" + date).slice(-2);

    const start_year = calendar_date.getFullYear();
    var end_year = start_year;
    if (month === 12) end_year = end_year + 1;

    return [
      start_year + "-" + start_month + "-" + date,
      end_year + "-" + end_month + "-" + date
    ];
  };

  componentWillMount = () => {
    this.apiClient = new APIClient();
    this.apiClient
      .getStockDetails(this.props.match.params.stockId)
      .then(json => {
        this.setState({
          items: json.details,
          isLoaded: true
        });
        const company = stockCodes.suggestions.filter(code => {
          return code.label === this.props.match.params.stockId;
        });
        const dates = this.getPredictionDates(new Date());
        this.apiClient
          .getGraph("else", 0, json.details.company, dates[0], dates[1])
          .then(data =>
            this.setState({
              items: {
                ...this.state.items,
                name: company[0].value
              },
              graphData: data.result
            })
          );
      });
  };

  render() {
    var { items } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h4"> {items.company} </Typography>
          <div style={{ flex: "1" }} />
          {this.context.user && (
            <Fab color="secondary" onClick={this.handleDrawerOpen}>
              <Add />
            </Fab>
          )}
        </div>
        <Typography variant="h5"> {items.name} </Typography>
        <Typography variant="h6"> Details </Typography>
        <Typography variant="body1"> Date: {items.date} </Typography>
        <Typography variant="body1">
          Yesterday closing: ${items.closing}
        </Typography>
        <Typography variant="body1">
          Earnings per share: ${items.eps}
        </Typography>
        <Typography variant="body1"> Daily high: ${items.high}</Typography>
        <Typography variant="body1"> Daily low: ${items.low}</Typography>
        <Typography variant="body1">
          Interest cover: ${items.interest_cover}
        </Typography>
        <Typography variant="body1">
          Profit margin: {items.profit_margin}
        </Typography>
        <Typography variant="body1"> Return on asset: ${items.roa} </Typography>
        <Typography variant="body1">Return on equity: ${items.roe}</Typography>
        <Typography variant="body1"> Volume: {items.volume}</Typography>
        {this.state.graphData !== "" && (
          <div style={{ maxWidth: "100%", height: "auto" }}>
            <Grapher data={this.state.graphData} />
          </div>
        )}
        {this.state.openDrawer && (
          <StockDrawer
            onClose={this.handleDrawerClose}
            isOpen={this.state.openDrawer}
            stock={items}
          />
        )}
      </div>
    );
  }
}

SingleStock.contextType = UserContext;

export const Stock = withStyles(styles)(SingleStock);
