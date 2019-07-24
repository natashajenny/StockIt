import React from 'react';
import {  Table, TableCell, TableHead, TableRow, 
    Paper, 
    TableBody} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { DeleteModal } from '../forms';
// import {StockDrawer} from '../StockDrawer/StockDrawer';
// import { Router } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import history from '../../history';




class StockTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      selectedStock: null,
      isDrawerOpen: false,
      items: [],
   
    }
  }

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

 

    handleAddStock = (e) =>{
    // e.preventDefault();
    console.log('The link was clicked.');
  }  

  handleDrawerToggle = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    })
  }

  getStockInfo(stock){

  }
  // cellClicked (rowNumber, columnNumber, evt) {
  //   console.log("activityId", evt.target.dataset.myRowIdentifier);
  // }

  handleCellClick(e){
    console.log(e);
    var path = `/Stocks/${e}`;
       history.push(`/Stocks/${e}`)
    console.log(path);

  }
    



  render() {
    
     var items = this.props.items;
      console.log(items);

      console.log(items);
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* <BrowserRouter> */}
        <Paper className={classes.root}>
          <Table  className={classes.table}>
              <TableHead>
                <TableRow>
                    <TableCell  align="center">Company</TableCell>
                    <TableCell align="center">eps</TableCell>
                    <TableCell align="center">gross_dividend</TableCell>
                    <TableCell align="center">profit_margin</TableCell>
                    <TableCell align="center">roa</TableCell>
                    <TableCell align="center">roe</TableCell>
                    <TableCell align="center">assets</TableCell>      
                    <TableCell>                 
                        {/* <StockDrawer/> */}
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {items.map(item => (
                <TableRow key={item.company} >
                    <TableCell onClick= {() => this.handleCellClick(item.company)} key={item.company}   align="center" >
                        {/* <Link to={`/Stocks/${item.company}`} > */}
                        <Link to={{
                            pathname:`/Stocks/${item.company}`,
                            
                        }}>
                            <Button variant="contained" color="primary" >
                                 {item.company}
                            </Button>
                        </Link>
                    </TableCell>
                  <TableCell align="center">{item.eps}</TableCell>
                  <TableCell align="center">{item.gross_dividend}</TableCell>
                  <TableCell align="center">{item.profit_margin}</TableCell>
                  <TableCell align="center">{item.roa}</TableCell>
                  <TableCell align="cen ter">{item.roe}</TableCell>
                  <TableCell align="center">{item.assets}</TableCell>
                </TableRow>
              ))}
              {/* <Route path={`/:stockId`} render={() => <Stock/>} /> */}
              </TableBody>        
          </Table>
        </Paper>
        {this.state.isDeleteModalOpen && <DeleteModal 
            onClose = {this.closeDeleteModal} 
            name = {this.state.selectedStock.Code}
            onDelete = {this.delete}/>}
        {/* </BrowserRouter> */}
      </React.Fragment>

      
    );
  }
}

export const Stocklist = withStyles(styles)(StockTable);
