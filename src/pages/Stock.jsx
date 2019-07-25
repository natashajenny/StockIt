import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import {newsGrid} from '../components/NewsGrid/NewsGrid';
// import {Stocklist} from '../components/Stocklist/Stocklist';
// import {StockDrawer} from '../components/StockDrawer/StockDrawer';
import { styles } from './styles';
import { PerformanceChart } from '../components/PerformanceChart/PerformanceChart';
import {  Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
// import { StockDrawer } from '../components/StockDrawer/StockDrawer';
import APIClient from '../api/apiClient.js';
import { AddStocks } from '../components/AddStocks/AddStocks';

export class SingleStock extends React.Component {
    

 
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            items: [],
            isLoaded: false,
            company:'',
          }
        }
        
      
    componentDidMount(){
        this.apiClient = new APIClient();
        console.log("In componentDidMount: " + this.company);
        this.apiClient.getStockDetails(this.company)
            .then(json =>{
                this.setState({
                    items: json.details,
                    isLoaded: true,
                    company: json.details.company,

                })
            });
            
    }
    

    
    render() {
        var {items, isLoaded, company } = this.state;
        const {stockId} = this.props.match.params;
        this.company = stockId;
        // console.log("stock id is " + stockId)
        console.log(isLoaded);
        console.log("this.company: " + company);
        console.log(items);
        return (
            
           
    <div>
        <h1> Stock Performance: {stockId} </h1>
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
            </Table>
            </div>
        );  
    // }
    }
}

export const Stock= withStyles(styles)(SingleStock);















// "asset_turnover": 0.7845, 
//       "assets": 2078100000.0, 
//       "company": "ABC", 
//       "eps": 28.4, 
//       "expenses": -1287600000.0, 
//       "gross_dividend": 40.0, 
//       "interest_cover": 18.8125, 
//       "inventory_turnover": 9.2415, 
//       "liabilities": 832500000.0, 
//       "net_gearing": 0.341, 
//       "profit": 256500000.0, 
//       "profit_margin": 0.1161, 
//       "revenue": 1645900000.0, 
//       "roa": 0.0967, 
//       "roe": 0.1522, 
//       "year": "2018-12-31"