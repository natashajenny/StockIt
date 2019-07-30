import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
// import { PerformanceChart } from '../components/PerformanceChart/PerformanceChart';
// import {  Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
import APIClient from '../api/apiClient.js';
// import { AddStocks } from '../components/AddStocks/AddStocks';

export class PureStockRank extends React.Component {
    

 
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            bot: [],
            isLoaded: false,
            top:[],
          }
        }
        
      
    componentDidMount(){
        this.apiClient = new APIClient();
        console.log("In componentDidMount: " + this.company);
        this.apiClient.gettopten()
            .then(json =>{
                this.setState({
                    isLoaded: true,
                    top: json.stocks,

                })
            });
            this.apiClient.getbotten()
            .then(json =>{
                this.setState({
                    bot: json.stocks,

                })
            });
            
    }
    

    
    render() {
        var {top, isLoaded, bot } = this.state;
      
    
        console.log(isLoaded);
        console.log(top);
        console.log(bot);
        return (
            
           
    <div className={classes.root}>
        {/* <h1> Stock Performance: {stockId} </h1>
        <PerformanceChart />
            <Table  >
              <TableHead>
                <TableRow>
                    <TableCell  align="center">company</TableCell>
                    <TableCell align="center">closing</TableCell>
                    <TableCell align="center">date</TableCell>
                    <TableCell align="center">eps</TableCell>
                    <TableCell align="center">high</TableCell>
                    <TableCell align="center">low</TableCell>
                    <TableCell align="center">interest_cover</TableCell>
                    <TableCell align="center">profit_margin</TableCell>
                    <TableCell align="center">roa</TableCell>
                    <TableCell align="center">roe</TableCell>
                    <TableCell align="center">volume</TableCell>
                    
                    <TableCell> <AddStocks items={items.company}/> </TableCell>     
                    </TableRow>
              </TableHead> 
                <TableBody>
                    <TableRow key={items.company}>
                    <TableCell align="center">{items.company}</TableCell>
                        <TableCell align="center">{items.closing}</TableCell>
                        <TableCell align="center">{items.date}</TableCell>
                        <TableCell align="center">{items.eps}</TableCell>
                        <TableCell align="center" style={{color:'green'}}>{items.high}</TableCell>
                        <TableCell align="center" style={{color: 'red'}}>{items.low}</TableCell>
                        <TableCell align="center">{items.interest_cover}</TableCell>
                        <TableCell align="center">{items.profit_margin}</TableCell>
                        <TableCell align="center">{items.roa}</TableCell>
                        <TableCell align="center">{items.roe}</TableCell>
                        <TableCell align="center">{items.volume}</TableCell>
                    </TableRow>
                </TableBody>
            </Table> */}
        </div>
    );  
    // }
    }
}

export const StockRank= withStyles(styles)(PureStockRank);




