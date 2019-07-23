import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {newsGrid} from '../components/NewsGrid/NewsGrid';
import {Stocklist} from '../components/Stocklist/Stocklist';
// import {StockDrawer} from '../components/StockDrawer/StockDrawer';
import { styles } from './styles';
import APIClient from '../api/apiClient.js';

export class PureStocks extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
      }
    componentDidMount(){
        this.apiClient = new APIClient();
        this.apiClient.getStocks()
            .then(json =>{
                this.setState({
                    isLoaded: true,
                    items: json.stocks,
                })
            });
    }

    render() {
        var { isLoaded, items } = this.state;
        // {newsGrid()}
    if(!isLoaded){
        return <div>Loading....</div>
      } else{
        newsGrid()
        console.log(isLoaded);
        console.log(items);
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> Stocks </h1>
                {newsGrid()}
                <Stocklist  items={items}/>
            </div>
        );  
    }
    }
}

export const Stocks = withStyles(styles)(PureStocks);















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