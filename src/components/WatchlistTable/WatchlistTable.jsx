import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Input
} from "@material-ui/core";
import { Check, Close, Edit, Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";
import { DeleteModal } from "../forms";
import { UserContext } from "../../UserContext";
import APIClient from "../../api/apiClient.js";

class PureWatchlistTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      selectedStock: null,
      isEditable: false,
      stocks: null,
      watchlist_data: null
    };
    this.formConfig = [
      "alert_high",
      "alert_low",
      "buy_high",
      "buy_low",
      "sell_high",
      "sell_low"
    ];
  }

  handleSubmitChange = () => {
    //TODO: apiClient update db with data from selectedStock
    this.apiClient
      .updateWatchlistStock(
        this.context.user.user_id,
        this.state.selectedStock.company,
        this.state.selectedStock
      )
      .then(data => {
        this.setState({
          watchlist_data: data.wl_stocks,
          isEditable: false,
          selectedStock: null
        });
        this.props.handleChangeWatchlistData(data.wl_stocks);
      });
  };

  handleCancelChange = () => {
    this.setState({
      isEditable: false,
      selectedStock: null
    });
  };

  handleInputChange = (e, label) => {
    const value = e.target.value;
    this.setState(prevState => ({
      selectedStock: {
        ...prevState.selectedStock,
        [label]: value
      }
    }));
  };

  handleRowEditClick = row => {
    this.setState({
      selectedStock: row,
      isEditable: true
    });
  };
  openDeleteModal = row => {
    this.setState({
      isDeleteModalOpen: true,
      selectedStock: row
    });
    console.log(row);
  };
  delete = () => {
    //TODO: apiclient delete param: stock key
    this.apiClient
      .deleteWatchlistStock(
        this.context.user.user_id,
        this.state.selectedStock.company
      )
      .then(data => {
        this.setState({
          watchlist_data: data.wl_stocks,
          selectedStock: null,
          isDeleteModalOpen: false
        });
        this.props.handleChangeWatchlistData(data.wl_stocks);
      });
  };
  closeDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: false
    });
  };

  componentDidMount = () => {
    this.apiClient = new APIClient();
    this.setState({
      watchlist_data: this.props.watchlist_data
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      nextProps.watchlist_data &&
      this.state.watchlist_data &&
      nextProps.watchlist_data.length === this.state.watchlist_data.length
    ) {
      if (nextState.isDeleteModalOpen !== this.state.isDeleteModalOpen) {
        return true;
      }
      if (nextState.isEditable !== this.state.isEditable) {
        return true;
      }
      return false;
    }
    return true;
  };

  componentDidUpdate = () => {
    this.context.user &&
      this.apiClient
        .getWatchlistStocks(this.context.user.user_id)
        .then(data => {
          this.setState({
            watchlist_data: data.wl_stocks
          });
          this.props.handleChangeWatchlistData(data.wl_stocks);
        });
  };

  render() {
    const { classes } = this.props;
    const { selectedStock, watchlist_data, isEditable } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="center">Alert High&nbsp;($)</TableCell>
                <TableCell align="center">Alert Low&nbsp;($)</TableCell>
                <TableCell align="center">Buy High&nbsp;($)</TableCell>
                <TableCell align="center">Buy Low&nbsp;($)</TableCell>
                <TableCell align="center">Sell High&nbsp;($)</TableCell>
                <TableCell align="center">Sell Low&nbsp;($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {watchlist_data &&
                watchlist_data.length !== 0 &&
                watchlist_data.map(row => (
                  <TableRow key={row.company}>
                    <TableCell className={classes.row}>
                      {isEditable && row.company === selectedStock.company ? (
                        <div>
                          <IconButton onClick={this.handleSubmitChange}>
                            <Check />
                          </IconButton>
                          <IconButton onClick={this.handleCancelChange}>
                            <Close />
                          </IconButton>
                        </div>
                      ) : (
                        <div>
                          <IconButton
                            onClick={() => this.handleRowEditClick(row)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => this.openDeleteModal(row)}>
                            <Delete />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">{row.company}</TableCell>
                    {this.formConfig.map(fieldName => (
                      <TableCell align="center">
                        {isEditable && row.company === selectedStock.company ? (
                          <Input
                            defaultValue={row[fieldName]}
                            onChange={e => this.handleInputChange(e, fieldName)}
                          />
                        ) : (
                          row[fieldName]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
        {this.state.isDeleteModalOpen && (
          <DeleteModal
            onClose={this.closeDeleteModal}
            name={this.state.selectedStock.company}
            onDelete={this.delete}
          />
        )}
      </React.Fragment>
    );
  }
}

PureWatchlistTable.contextType = UserContext;

export const WatchlistTable = withStyles(styles)(PureWatchlistTable);
