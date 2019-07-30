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
      isAddingStock: false
    };
  }

  handleAddStock = (e, stock) => {
    e.preventDefault();
    this.apiClient
      .addWatchlistStock(this.context.user.user_id, stock.code, stock)
      .then(data => {
        this.closeAddStockModal();
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

  componentDidMount = () => {
    this.apiClient = new APIClient();
    this.context.user &&
      this.apiClient
        .getWatchlistStocks(this.context.user.user_id)
        .then(data => {
          console.log(data.wl_stocks);
          this.setState({
            Watchlists: data.wl_stocks
          });
        });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1> Watchlist </h1>
        <div className={classes.WatchlistSubheading}>
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
        <WatchlistTable WatchlistId={this.state.WatchlistId} />
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
