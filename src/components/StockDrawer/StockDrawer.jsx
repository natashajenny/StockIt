import React from "react";
import { Select, Drawer, IconButton, Typography } from "@material-ui/core";
import { Close, CheckCircle } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { UserContext } from "../../UserContext";
import { styles } from "./styles";
import APIClient from "../../api/apiClient.js";
import { AddStockToWatchlist } from "./AddStockToWatchlist";
import { AddStockToPortfolio } from "./AddStockToPortfolio";

class PureStockDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPortfolio: null,
      portfolios: null,
      addedStock: false
    };
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

  handleAddStockToPortfolio = (e, stock) => {
    e.preventDefault();
    this.apiClient
      .addPortfolioStock(
        this.context.user.user_id,
        this.state.selectedPortfolio.portfolio_id,
        stock
      )
      .then(data => {
        this.setState({
          addedStock: true
        });
      });
  };

  handleAddStockToWatchlist = (e, stock) => {
    e.preventDefault();
    this.apiClient
      .addWatchlist(this.context.user.user_id, stock.code.data)
      .then(data => {
        this.apiClient
          .addWatchlistStock(this.context.user.user_id, stock.code.data, stock)
          .then(data => {
            this.setState({
              addedStock: true
            });
          });
      });
  };

  componentWillMount = () => {
    this.apiClient = new APIClient();
    this.apiClient.getPortfolios(this.context.user.user_id).then(data => {
      data.portfolios.push({ title: "Watchlist", portfolio_id: "0" });
      this.setState({
        portfolios: data.portfolios
      });
      this.setState({
        selectedPortfolio: data.portfolios[0]
      });
    });
  };

  render() {
    const { classes, isOpen, onClose, stock } = this.props;
    const { portfolios, addedStock, selectedPortfolio } = this.state;
    return (
      <div>
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          anchor="right"
          open={isOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true
          }}
        >
          <div className={classes.toolbar} />
          <IconButton className={classes.closeButton} onClick={onClose}>
            <Close />
          </IconButton>
          <div className={classes.root}>
            <h1> Add Stock </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%"
              }}
            >
              <Typography variant="body1">to </Typography>
              <Select
                native
                value={this.state.portfolioName}
                onChange={this.handleSelectChange}
                inputProps={{
                  name: "portfolioName"
                }}
                style={{
                  width: "70%"
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
            </div>
            {selectedPortfolio && selectedPortfolio.title === "Watchlist" ? (
              <AddStockToWatchlist
                onSubmit={this.handleAddStockToWatchlist}
                stock={stock}
              />
            ) : (
              <AddStockToPortfolio
                onSubmit={this.handleAddStockToPortfolio}
                stock={stock}
              />
            )}
            {addedStock && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "15px"
                }}
              >
                <CheckCircle style={{ color: "green" }} />
                <Typography variant="caption" style={{ color: "green" }}>
                  The stock has been successfully added to{" "}
                  {selectedPortfolio.title}
                </Typography>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    );
  }
}

PureStockDrawer.contextType = UserContext;

export const StockDrawer = withStyles(styles)(PureStockDrawer);
