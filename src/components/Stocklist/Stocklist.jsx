import React from 'react';
import { Table, TableCell, TableHead, TableRow, Paper, TableBody, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import history from '../../history.js';




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

  handleCellClick(e){
    history.push(`/Stocks/${e}`)
  }
    
  render() {
    const items = this.props.items;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table  className={classes.table}>
            <TableHead>
              <TableRow>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">eps</TableCell>
                  <TableCell align="center">gross_dividend</TableCell>
                  <TableCell align="center">profit_margin</TableCell>
                  <TableCell align="center">roa</TableCell>
                  <TableCell align="center">roe</TableCell>
                  <TableCell align="center">assets</TableCell>      
              </TableRow>
            </TableHead>
            <TableBody>
            {items.map(item => (
              <TableRow key={item.company} >
                  <TableCell onClick= {() => this.handleCellClick(item.company)} key={item.company}   align="center" >
                    <Button variant="contained" color="primary" >
                        {item.company}
                      </Button>
                  </TableCell>
                <TableCell align="center">{item.eps}</TableCell>
                <TableCell align="center">{item.gross_dividend}</TableCell>
                <TableCell align="center">{item.profit_margin}</TableCell>
                <TableCell align="center">{item.roa}</TableCell>
                <TableCell align="cen ter">{item.roe}</TableCell>
                <TableCell align="center">{item.assets}</TableCell>
              </TableRow>
            ))}
            </TableBody>        
        </Table>
      </Paper>
    );
  }
}

export const Stocklist = withStyles(styles)(StockTable);
