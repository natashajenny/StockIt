import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, 
    Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import portfolio_data from '../../mock/portfolio_data.json';
import { DeleteModal } from '../forms';

class PurePortfolioTable extends React.Component {
  handleRowEditClick = (row) => {
    //TODO: make quantity editable
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
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
              <TableHead>
                <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell align="center">Code</TableCell>
                    <TableCell align="center">Bought Price&nbsp;($)</TableCell>
                    <TableCell align="center">Current Price&nbsp;($)</TableCell>
                    <TableCell align="center">Change&nbsp;(%)</TableCell>
                    <TableCell align="center">High&nbsp;</TableCell>
                    <TableCell align="center">Low&nbsp;</TableCell>
                    <TableCell align="center">Return&nbsp;(%)</TableCell>
                    <TableCell align="center">Quantity&nbsp;</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {portfolio_data.payload.stocks.map(row => (
                <TableRow key={row.StockID}>
                  <TableCell className={classes.row}>
                    <IconButton onClick={ () => this.handleRowEditClick(row)}><Edit /></IconButton> 
                    <IconButton onClick={ () => this.openDeleteModal(row)}><Delete /></IconButton>
                  </TableCell>
                  <TableCell align="center">{row.Code}</TableCell>
                  <TableCell align="center">{row.BoughtPrice}</TableCell>
                  <TableCell align="center">{row.CurPrice}</TableCell>
                  <TableCell align="center">{row.Chg}</TableCell>
                  <TableCell align="center">{row.High}</TableCell>
                  <TableCell align="center">{row.Low}</TableCell>
                  <TableCell align="center">{row.Return}</TableCell>
                  <TableCell align="center">{row.Quantity}</TableCell>
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

export const PortfolioTable = withStyles(styles)(PurePortfolioTable);
