import React from 'react';
import {  Table, TableCell, TableHead, TableRow, 
    Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { DeleteModal } from '../forms';
import {StockDrawer} from '../StockDrawer/StockDrawer';
class StockTable extends React.Component {
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
      isDrawerOpen: false,
    }
  }

    handleAddStock = (e) =>{
    // e.preventDefault();
    console.log('The link was clicked.');
  }  

  handleDrawerToggle = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    })
  }
  
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
              <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Code</TableCell>
                    <TableCell align="center">Bought Price&nbsp;($)</TableCell>
                    <TableCell align="center">Quantity&nbsp;</TableCell>
                    <TableCell> 
                        {/* <Button  onClick={this.handleAddStock} variant="contained" color="primary" className={classes.button}>
                            Add Stock
                        </Button> */}
                        <StockDrawer/>
                    </TableCell>
                </TableRow>
              </TableHead>
            {/* <TableBody>
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
            </TableBody> */}
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

export const Stocklist = withStyles(styles)(StockTable);
