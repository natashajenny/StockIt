import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, 
    Paper, Input } from '@material-ui/core';
import { Check, Close, Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import watchlist_data from '../../mock/watchlist_data.json';
import { DeleteModal } from '../forms';

class PureWatchlistTable extends React.Component {
  
  handleSubmitChange = () => {
    //TODO: apiClient update db with data from selectedStock
    this.setState({
      isEditable: false,
      selectedRow: null,
    })
  }

  handleCancelChange = () => {
    this.setState({
      isEditable: false,
      selectedRow: null,
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
    this.setState({
      isDeleteModalOpen: false,
      selectedStock: null,
    })
  }
  closeDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: false,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      selectedStock: null,
      isEditable: false,
    }
  }
  render() {
    const { classes } = this.props;
    const { isEditable, selectedStock } = this.state;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
              <TableHead>
                <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell align="center">Code</TableCell>
                    <TableCell align="center">Current Price&nbsp;($)</TableCell>
                    <TableCell align="center">Change&nbsp;(%)</TableCell>
                    <TableCell align="center">High&nbsp;</TableCell>
                    <TableCell align="center">Low&nbsp;</TableCell>
                    <TableCell align="center">Return&nbsp;(%)</TableCell>
                    <TableCell align="center">Requested Quantity&nbsp;</TableCell>
                    <TableCell align="center">Notification&nbsp;</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {watchlist_data.payload.stocks.map(row => (
                <TableRow key={row.StockID}>
                  <TableCell className={classes.row}>
                    {isEditable && row.StockID === selectedStock.StockID ? 
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
                  <TableCell align="center">{row.Code}</TableCell>
                  <TableCell align="center">
                    { isEditable && row.StockID === selectedStock.StockID ? 
                      <Input
                        defaultValue={row.BoughtPrice} 
                        onChange={(e) => this.handleInputChange(e,'BoughtPrice')}
                      />
                    :
                      row.BoughtPrice
                    }
                  </TableCell>
                  <TableCell align="center">{row.CurPrice}</TableCell>
                  <TableCell align="center">{row.Chg}</TableCell>
                  <TableCell align="center">{row.High}</TableCell>
                  <TableCell align="center">{row.Low}</TableCell>
                  <TableCell align="center">{row.Return}</TableCell>
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
                </TableRow>
              ))}
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

export const WatchlistTable = withStyles(styles)(PureWatchlistTable);
