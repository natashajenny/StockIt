import React from "react";
import {
  Button,
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
import { Grapher } from "../Grapher";

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
      netGain: 0,
      openPrediction: false,
      prediction: null,
      processingUpdate: false,
      processingPrediction: false,
    };
  }

  handleSubmitChange = () => {
    this.setState({
      processingUpdate: true
    })
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
          processingUpdate: false,
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
      isEditable: true,
      processing: false,
    });
  };

  handleOpenPrediction = row => {
    this.setState({
      processingPrediction: true
    })
    const date = this.getStartingDate();
    this.apiClient
      .getPredictionGraph(row.company, date)
      .then(data => {
        this.setState({
          selectedStock: row,
          openPrediction: true,
          prediction: data,
          processingPrediction: false,
        });
      });
  };

  handleClosePrediction = () => {
    this.setState({
      selectedStock: null,
      openPrediction: false,
      prediction: null,
      processingPrediction: false,
    });
  };

  openDeleteModal = row => {
    this.setState({
      isDeleteModalOpen: true,
      selectedStock: row
    });
  };

  delete = () => {
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
          isDeleteModalOpen: false,
          netGain: data.net_gain
        });
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

  getStartingDate = () => {
    const current_date = new Date().toLocaleDateString().split("/");
    var date = parseInt(current_date[0]);
    if (date < 10) date = ("0" + date).slice(-2);
    
    const month = parseInt(current_date[1]);
    var year = parseInt(current_date[2]);

    var start_month = month - 2;
    if (start_month < 0) {
      start_month = start_month + 12
      year = year - 1
    }
    if (start_month < 10) start_month = ("0" + start_month).slice(-2);

    return year + "-" + start_month + "-" + date;
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.portfolioId === this.state.portfolioId) {
      if (nextState.isDeleteModalOpen !== this.state.isDeleteModalOpen) {
        return true;
      }
      if (nextState.isEditable !== this.state.isEditable) {
        return true;
      }
      if (
        nextProps.netGain !== this.state.netGain ||
        nextState.netGain !== this.state.netGain
      ) {
        return true;
      }
      if (nextState.prediction !== this.state.prediction) {
        return true;
      }
      if (nextState.prediction && this.state.prediction &&
          nextState.prediction.graph !== this.state.prediction.graph) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate = () => {
    this.context.user &&
      this.apiClient
        .getPortfolioStocks(this.context.user.user_id, this.props.portfolioId)
        .then(data => {
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
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.cell}>
                  Actions
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Code
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Purchase Price&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Current Price&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Daily Change&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Daily Change&nbsp;(%)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Daily High&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Daily Low&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Unit Gain&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Total Gain&nbsp;($)
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Quantity&nbsp;
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Prediction
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio_data &&
                portfolio_data.length !== 0 &&
                portfolio_data.map(row => (
                  <TableRow className={classes.row} key={row.company}>
                    <TableCell className={classes.cell}>
                      {isEditable && row.company === selectedStock.company ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <IconButton disabled={this.state.processingUpdate} onClick={this.handleSubmitChange}>
                            <Check />
                          </IconButton>
                          <IconButton disabled={this.state.processingUpdate} onClick={this.handleCancelChange}>
                            <Close />
                          </IconButton>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "row" }}>
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
                    <TableCell className={classes.cell} align="center">
                      {row.company}
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
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
                    <TableCell className={classes.cell} align="center">
                      {row.adjusted}
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
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
                    <TableCell className={classes.cell} align="center">
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
                    <TableCell className={classes.cell} align="center">
                      {row.high}
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
                      {row.low}
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
                      {row.unit_gain >= 0 ? (
                        <Typography variant="body2" style={{ color: "green" }}>
                          {row.unit_gain}
                        </Typography>
                      ) : (
                        <Typography variant="body2" style={{ color: "red" }}>
                          {row.unit_gain}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
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
                    <TableCell className={classes.cell} align="center">
                      {isEditable && row.StockID === selectedStock.StockID ? (
                        <Input
                          defaultValue={row.quantity}
                          onChange={e => this.handleInputChange(e, "quantity")}
                        />
                      ) : (
                        row.quantity
                      )}
                    </TableCell>
                    <TableCell className={classes.cell} align="center">
                      <Button
                        disabled={this.state.processingPrediction}
                        color="primary"
                        onClick={() => this.handleOpenPrediction(row)}
                      >
                        Show
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
        {this.state.openPrediction && this.state.prediction && (
          <div>
            <div
              className={classes.darkBackdrop}
              onClick={this.handleClosePrediction}
            />
            <Paper className={classes.predictionGraphContainer}>
              <h1 style={{ margin: 0 }}>
                {selectedStock.company} Future Prediction
              </h1>
              <IconButton
                className={classes.closeButton}
                onClick={this.handleClosePrediction}
              >
                <Close />
              </IconButton>
              <Grapher data={this.state.prediction.graph} />
              {this.state.prediction.price && 
                <div>
                  <Typography variant="body1">Predicted Price in 20 days = ${this.state.prediction.price.toFixed(2)}</Typography>
                  {this.state.prediction.price < selectedStock.closing ? 
                      <Typography variant="body1" style={{color: "red"}}>
                        Predicted Loss = -${(selectedStock.closing - this.state.prediction.price).toFixed(2)}
                      </Typography>
                    :
                      <Typography variant="body1" style={{color: "green"}}>
                        Predicted Gain = +${(this.state.prediction.price - selectedStock.closing).toFixed(2)}
                      </Typography>
                  }
                </div>
              }
              
            </Paper>
          </div>
        )}
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
