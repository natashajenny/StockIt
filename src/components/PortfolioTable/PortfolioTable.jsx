import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import portfolio_data from '../../mock/portfolio_data.json';
import { DeleteModal } from '../forms';

class PurePortfolioTable extends React.Component {
  handleRowEditClick = (event) => {
    //TODO: make quantity editable
  }

  openDeleteModal = (event) => {
    this.setState({
      isDeleteModalOpen: true,
    })
    console.log(event);
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
      selectedStock: '',
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
                <TableRow key={row.name}>
                  <TableCell className={classes.row}>
                    <IconButton onClick={this.handleRowEditClick}><Edit /></IconButton> 
                    <IconButton onClick= {this.openDeleteModal}><Delete /></IconButton>
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
        {this.state.isDeleteModalOpen && <DeleteModal onClose = {this.closeDeleteModal}/>}
      </React.Fragment>
    );
  }
}

export const PortfolioTable = withStyles(styles)(PurePortfolioTable);
