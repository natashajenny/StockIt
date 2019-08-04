import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

import { AddWatchlistStockModal, WatchlistTable } from "../components";
import { styles } from "./styles";

import { UserContext } from "../UserContext";
import APIClient from "../api/apiClient.js";

export class PureWatchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingStock: false,
      openAddStockModal: false,
      watchlist_data: null
    };
  }

  handleAddStock = (e, stock) => {
    e.preventDefault();
    this.apiClient
      .addWatchlist(this.context.user.user_id, stock.code.data)
      .then(data => {
        this.apiClient
          .addWatchlistStock(this.context.user.user_id, stock.code.data, stock)
          .then(data => {
            this.setState({
              watchlist_data: data.wl_stocks
            });
            this.closeAddStockModal();
          });
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

  handleRefreshClick = () => {
    this.apiClient.getWatchlistStocks(this.context.user.user_id).then(data => {
      this.setState({
        watchlist_data: data.wl_stocks
      });
    });
  };

  handleChangeWatchlistData = watchlist_data => {
    this.setState({
      watchlist_data: watchlist_data
    });
  };

  componentDidMount = () => {
    this.apiClient = new APIClient();
    this.context.user &&
      this.apiClient
        .getWatchlistStocks(this.context.user.user_id)
        .then(data => {
          this.setState({
            watchlist_data: data.wl_stocks
          });
        });
  };

  render() {
    const { classes } = this.props;
    const { watchlist_data } = this.state;
    return (
      <div className={classes.root}>
        <div style={{ display: "flex", width: "100%" }}>
          <h1> Watchlist </h1>
          <div style={{ flex: "1" }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addStockButton}
              onClick={this.handleAddStockModalClick}
            >
              <Add />
              Add New Stock
            </Button>
          </div>
        </div>
        <WatchlistTable
          watchlist_data={watchlist_data}
          handleChangeWatchlistData={this.handleChangeWatchlistData}
        />
        {this.state.openAddStockModal && (
          <AddWatchlistStockModal
            onClose={this.closeAddStockModal}
            onSubmit={this.handleAddStock}
          />
        )}
      </div>
    );
  }
}

PureWatchlist.contextType = UserContext;

export const Watchlist = withStyles(styles)(PureWatchlist);
