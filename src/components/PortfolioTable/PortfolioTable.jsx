import React from 'react';
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, 
    Paper, Input } from '@material-ui/core';
import { Add, Check, Close, Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
// import portfolio_data from '../../mock/portfolio_data.json';
import { DeleteModal } from '../forms';
import { SearchAutoFill } from '../';
import { UserContext } from '../../UserContext';
import APIClient from '../../api/apiClient.js';

class PurePortfolioTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      selectedStock: null,
      isEditable: false,
      stocks: null,
      portfolio_data: null,
      portfolioId: '',
    }
  }

  handleSubmitAdd = () => {
    this.apiClient.addPortfolioStock(
      this.context.user.user_id,
      this.props.portfolioId,
      this.state.selectedStock
    ).then((data) => {
      this.props.toggleAddStock();
    })
  }

  handleCancelAdd = () => {
    this.props.toggleAddStock();
  }

  handleSubmitChange = () => {
    //TODO: apiClient update db with data from selectedStock
    this.apiClient.updatePortfolioStock(
      this.context.user.user_id,
      this.props.portfolioId,
      this.state.selectedStock.company,
      this.state.selectedStock,
    ).then((data) => 
        this.setState({
          isEditable: false,
          selectedStock: null,
        })
      )
  }

  handleCancelChange = () => {
    this.setState({
      isEditable: false,
      selectedStock: null,
    })
  }

  handleInputChange = (e, label) => {
    const value = e.target.value;
    this.setState( prevState => ({
      selectedStock: {
        ...prevState.selectedStock, 
        [label]: value,
      }
    }))
  }
  
  handleRowEditClick = (row) => {
    this.setState({
      selectedStock: row,
      isEditable: true,
    })
  }
  openDeleteModal = (row) => {
    this.setState({
      isDeleteModalOpen: true,
      selectedStock: row,
    })
    console.log(row);
  }
  delete = () => {
    //TODO: apiclient delete param: stock key
    this.apiClient.deletePortfolioStock(
      this.context.user.user_id,
      this.props.portfolioId,
      this.state.selectedStock.company,
    ).then((data) => 
        this.setState({
          isDeleteModalOpen: false,
          selectedStock: null,
        })
      )
  }
  closeDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: false,
    })
  }

  componentDidMount = () => {
    this.apiClient = new APIClient();
    this.context.user && this.apiClient.getPortfolioStocks(
      this.context.user.user_id, 
      this.context.user.portfolios[0],
    ).then((data) => {
      data.portfolio_stocks !== {} &&
        this.setState({
          portfolio_data: data.portfolio_stocks,
          portfolioId: this.context.user.portfolios[0],
        })
      })
  }

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.portfolioId === this.state.portfolioId) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate = () => {
    console.log('componentdidupdate')
    this.context.user && this.apiClient.getPortfolioStocks(
      this.context.user.user_id, 
      this.props.portfolioId,
    ).then((data) => {
      data.portfolio_stocks !== {} &&
        this.setState({
          portfolio_data: data.portfolio_stocks,
          portfolioId: this.props.portfolioId,
        })
      })
  }

  render() {
    const { isAddingStock, classes } = this.props;
    const { selectedStock, portfolio_data, isEditable } = this.state;
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
                    {/* <TableCell align="center">Change&nbsp;(%)</TableCell> */}
                    <TableCell align="center">High&nbsp;</TableCell>
                    <TableCell align="center">Low&nbsp;</TableCell>
                    {/* <TableCell align="center">Return&nbsp;(%)</TableCell> */}
                    <TableCell align="center">Quantity&nbsp;</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {isAddingStock &&
                <TableRow key='new_stock'>
                  <TableCell className={classes.row}>
                    <IconButton onClick={this.handleSubmitAdd}><Check /></IconButton>
                    <IconButton onClick={this.handleCancelAdd}><Close /></IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Input
                      onChange={(e) => this.handleInputChange(e,'code')}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Input
                      onChange={(e) => this.handleInputChange(e,'boughtPrice')}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {selectedStock && selectedStock.currentPrice ? selectedStock.currentPrice : '-'}
                  </TableCell>
                  {/* <TableCell align="center">
                    {selectedStock && selectedStock.change ? selectedStock.change : '-'}
                  </TableCell> */}
                  <TableCell align="center">
                    {selectedStock && selectedStock.high ? selectedStock.high : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {selectedStock && selectedStock.low ? selectedStock.low : '-'}
                  </TableCell>
                  {/* <TableCell align="center">
                    {selectedStock && selectedStock.return ? selectedStock.return : '-'}
                  </TableCell> */}
                  <TableCell align="center">
                    <Input
                      onChange={(e) => this.handleInputChange(e,'quantity')}
                    />
                  </TableCell>
                </TableRow>
              }
              {console.log(portfolio_data)}
              {portfolio_data && portfolio_data.length !== 0 
                && portfolio_data.map(row => (
                <TableRow key={row.company}>
                  <TableCell className={classes.row}>
                    {isEditable && row.company === selectedStock.company ? 
                      <div>
                        <IconButton onClick={this.handleSubmitChange}><Check /></IconButton>
                        <IconButton onClick={this.handleCancelChange}><Close /></IconButton>
                      </div>
                    :
                      <div>
                        <IconButton onClick={ () => this.handleRowEditClick(row)}><Edit /></IconButton> 
                        <IconButton onClick={ () => this.openDeleteModal(row)}><Delete /></IconButton>
                      </div>
                    }
                  </TableCell>
                  <TableCell align="center">{row.company}</TableCell>
                  <TableCell align="center">
                    { isEditable && row.company === selectedStock.company ? 
                      <Input
                        defaultValue={row.boughtPrice} 
                        onChange={(e) => this.handleInputChange(e,'boughtPrice')}
                      />
                    :
                      row.boughtPrice
                    }
                  </TableCell>
                  <TableCell align="center">{row.adjusted}</TableCell>
                  {/* <TableCell align="center">{row.change}</TableCell> */}
                  <TableCell align="center">{row.high}</TableCell>
                  <TableCell align="center">{row.low}</TableCell>
                  {/* <TableCell align="center">{row.Return}</TableCell> */}
                  <TableCell align="center">
                    { isEditable && row.StockID === selectedStock.StockID ? 
                      <Input
                        defaultValue={row.Quantity} 
                        onChange={(e) => this.handleInputChange(e,'Quantity')}
                      />
                    :
                      row.Quantity
                    }
                  </TableCell>
                </TableRow>))
              }
            </TableBody>
          </Table>
        </Paper>
        {this.state.isDeleteModalOpen && <DeleteModal 
            onClose = {this.closeDeleteModal} 
            name = {this.state.selectedStock.Code}
            onDelete = {this.delete}/>}
      </React.Fragment>
    );
  }
}

PurePortfolioTable.contextType = UserContext;

export const PortfolioTable = withStyles(styles)(PurePortfolioTable);
