import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Input,
  Typography
} from "@material-ui/core";
import { Check, Close, Edit, Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";
import { DeleteModal } from "../forms";
import { UserContext } from "../../UserContext";
import APIClient from "../../api/apiClient.js";

class PurePortfolioTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      selectedStock: null,
      isEditable: false,
      stocks: null,
      portfolio_data: null,
      portfolioId: "",
      netGain: 0
    };
  }

  handleSubmitChange = () => {
    this.apiClient
      .updatePortfolioStock(
        this.context.user.user_id,
        this.props.portfolioId,
        this.state.selectedStock.company,
        this.state.selectedStock
      )
      .then(data => {
        this.setState({
          portfolio_data: data.portfolio_stocks,
          isEditable: false,
          selectedStock: null,
          netGain: data.net_gain
        });
        this.props.handleChangePortfolioData(
          data.portfolio_stocks,
          data.net_gain
        );
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
    // console.log("::openDeleteModal::");
    this.setState({
      isDeleteModalOpen: true,
      selectedStock: row
    });
  };
  delete = () => {
    // console.log("in delete!");
    this.apiClient
      .deletePortfolioStock(
        this.context.user.user_id,
        this.props.portfolioId,
        this.state.selectedStock.company
      )
      .then(data => {
        this.setState({
          portfolio_data: data.portfolio_stocks,
          selectedStock: null,
          netGain: data.net_gain
        });
        this.closeDeleteModal();
        this.props.handleChangePortfolioData(
          data.portfolio_stocks,
          data.net_gain
        );
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
      portfolio_data: this.props.portfolio_data,
      netGain: this.props.netGain,
      portfolioId: this.props.portfolioId
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    // nextProps.portfolio_data && console.log(nextProps.portfolio_data.length);
    if (nextProps.portfolioId === this.state.portfolioId) {
      if (nextState.isDeleteModalOpen !== this.state.isDeleteModalOpen) {
        return true;
      }
      if (nextState.isEditable !== this.state.isEditable) {
        return true;
      }
      if (
        nextState.portfolio_data &&
        nextState.portfolio_data.length !== this.state.portfolio_data.length
      ) {
        return true;
      }
      if (
        nextProps.portfolio_data &&
        nextProps.portfolio_data.length !== this.state.portfolio_data.length
      ) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate = () => {
    // console.log("componentdidupdate");
    this.context.user &&
      this.apiClient
        .getPortfolioStocks(this.context.user.user_id, this.props.portfolioId)
        .then(data => {
          // console.log(data.portfolio_stocks);
          data.portfolio_stocks !== {} &&
            this.setState({
              portfolio_data: data.portfolio_stocks,
              portfolioId: this.props.portfolioId,
              netGain: data.net_gain
            });
          this.props.handleChangePortfolioData(
            data.portfolio_stocks,
            data.net_gain
          );
        });
  };

  render() {
    const { classes } = this.props;
    const { selectedStock, portfolio_data, isEditable } = this.state;
    console.log(this.state.selectedStock);
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="center">Purchase Price&nbsp;($)</TableCell>
                <TableCell align="center">Current Price&nbsp;($)</TableCell>
                <TableCell align="center">Change&nbsp;($)</TableCell>
                <TableCell align="center">Change&nbsp;(%)</TableCell>
                <TableCell align="center">High&nbsp;</TableCell>
                <TableCell align="center">Low&nbsp;</TableCell>
                <TableCell align="center">Stock Gain&nbsp;</TableCell>
                <TableCell align="center">Quantity&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {console.log(portfolio_data)} */}
              {portfolio_data &&
                portfolio_data.length !== 0 &&
                portfolio_data.map(row => (
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
                    <TableCell align="center">
                      {isEditable && row.company === selectedStock.company ? (
                        <Input
                          defaultValue={row.bought_price}
                          onChange={e =>
                            this.handleInputChange(e, "bought_price")
                          }
                        />
                      ) : (
                        row.bought_price
                      )}
                    </TableCell>
                    <TableCell align="center">{row.adjusted}</TableCell>
                    <TableCell align="center">
                      {row.change >= 0 ? (
                        <Typography variant="body2" style={{ color: "green" }}>
                          {row.change}
                        </Typography>
                      ) : (
                        <Typography variant="body2" style={{ color: "red" }}>
                          {row.change}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.change_pct >= 0 ? (
                        <Typography variant="body2" style={{ color: "green" }}>
                          {(row.change_pct * 100).toFixed(2)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" style={{ color: "red" }}>
                          {(row.change_pct * 100).toFixed(2)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">{row.high}</TableCell>
                    <TableCell align="center">{row.low}</TableCell>
                    <TableCell align="center">
                      {row.stock_gain >= 0 ? (
                        <Typography variant="body2" style={{ color: "green" }}>
                          {row.stock_gain}
                        </Typography>
                      ) : (
                        <Typography variant="body2" style={{ color: "red" }}>
                          {row.stock_gain}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditable && row.StockID === selectedStock.StockID ? (
                        <Input
                          defaultValue={row.quantity}
                          onChange={e => this.handleInputChange(e, "quantity")}
                        />
                      ) : (
                        row.quantity
                      )}
                    </TableCell>
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

PurePortfolioTable.contextType = UserContext;

export const PortfolioTable = withStyles(styles)(PurePortfolioTable);
