import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import {newsGrid} from '../components/NewsGrid/NewsGrid';
// import {Stocklist} from '../components/Stocklist/Stocklist';
// import {StockDrawer} from '../components/StockDrawer/StockDrawer';
import { styles } from './styles';
import { PerformanceChart } from '../components/PerformanceChart/PerformanceChart';
import {  Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
export class SingleStock extends React.Component {
    // handleClick = (address) => {
    //     history.push(`/${address}`)
    // }
 
    // constructor(props){
    //     super(props);
    //     this.state = {
    //       items: [],
    //       isLoaded: false,
    //     }
    //   }
    constructor(props) {
        super(props);
        console.log(props);
        
      }
    // componentDidMount(){
    //     this.apiClient = new APIClient();
    //     this.apiClient.getStocks()
    //         .then(json =>{
    //             this.setState({
    //                 isLoaded: true,
    //                 items: json.stocks,
    //             })
    //         });
    // }
    

    
    render() {
        const {stockId} = this.props.match.params;
        console.log(stockId);
        return (
            
           
    <div>
        <h1> Stock Performance: {stockId} </h1>
        <PerformanceChart />
            <Table  >
              <TableHead>
                <TableRow>
                    <TableCell  align="center">Company</TableCell>
                    <TableCell align="center">eps</TableCell>
                    <TableCell align="center">gross_dividend</TableCell>
                    <TableCell align="center">profit_margin</TableCell>
                    <TableCell align="center">roa</TableCell>
                    <TableCell align="center">roe</TableCell>
                    <TableCell align="center">assets</TableCell>      
                    </TableRow>
              </TableHead> 
                <TableBody>
                    <TableRow key={stockId}>
                    <TableCell align="center">{stockId}</TableCell>
                        <TableCell align="center">28.4</TableCell>
                        <TableCell align="center">40.0</TableCell>
                        <TableCell align="center">0.1161</TableCell>
                        <TableCell align="center">0.0967</TableCell>
                        <TableCell align="cen ter">0.1522</TableCell>
                        <TableCell align="center">2078100000.0</TableCell>
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