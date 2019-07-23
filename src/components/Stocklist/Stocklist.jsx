import React from 'react';
import {  Table, TableCell, TableHead, TableRow, 
    Paper, 
    TableBody} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { DeleteModal } from '../forms';
import {StockDrawer} from '../StockDrawer/StockDrawer';
// import APIClient from '../../api/apiClient.js';
class StockTable extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     items: [],
  //     isLoaded: false,
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {
      isDeleteModalOpen: false,
      selectedStock: null,
      isDrawerOpen: false,
      items: [],
      // isLoaded: false,
    }
  }

//   componentDidMount(){
//     this.apiClient = new APIClient();
//     this.apiClient.getStocks()
//         .then(json =>{
//             this.setState({
//                 isLoaded: true,
//                 items: json.stocks,
//             })
            
//         });
// }

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
  
  render() {
    
    // var { isLoaded, items } = this.state;
     var items = this.props.items;
    // if(!isLoaded){
      // console.log(isLoaded);
      console.log(items);
      // return <div>Loading....</div>

    // } else {
      // console.log(isLoaded);
      console.log(items);
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
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
                        {/* <Button  onClick={this.handleAddStock} variant="contained" color="primary" className={classes.button}>
                            Add Stock
                        </Button> */}
                        <StockDrawer/>
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {items.map(item => (
                <TableRow key={item.company}>
                  <TableCell key={item.company} align="center">{item.company}</TableCell>
                  <TableCell align="center">{item.eps}</TableCell>
                  <TableCell align="center">{item.gross_dividend}</TableCell>
                  <TableCell align="center">{item.profit_margin}</TableCell>
                  <TableCell align="center">{item.roa}</TableCell>
                  <TableCell align="center">{item.roe}</TableCell>
                  <TableCell align="center">{item.assets}</TableCell>
                </TableRow>
              ))}

              </TableBody>
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
    // }
  }
}

export const Stocklist = withStyles(styles)(StockTable);
