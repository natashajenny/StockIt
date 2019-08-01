import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import APIClient from '../../api/apiClient';
import { UserContext } from '../../UserContext';
import { Button } from '@material-ui/core';

export class PureAddStocks extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            portfolioName: '',
            portfolios: null,
        }
      }
    componentDidMount(){
        this.apiClient = new APIClient();
        this.context.user && this.apiClient.getPortfolios(this.context.user.user_id)
          .then((data) => {
            this.setState({
              portfolios: data.portfolios
            })
          })
    }
    addPortfolio(){
            console.log("im here");
            
    }

    addWatchlist(items){
        console.log(items);
        this.apiClient.addWatchlist(this.context.user.user_id,items);
    }
    render() {
        var userId = this.context.user.user_id;
        var items = this.props.items;
        // {newsGrid()}
        // newsGrid()
        // console.log(this.context.user);
        console.log("VARIABLE PASSED IN: " + items);
        console.log(userId);
        console.log(this.state.portfolios);
        
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> Add Stocks </h1>
                <Button  onClick= {() => this.addPortfolio()}  variant="contained" color="primary">Add Portfolio</Button>
                <Button onClick={() => this.addWatchlist(items)} variant="contained" color="primary">Add Watchlist</Button>
            </div>
        );  
    }
}
PureAddStocks.contextType = UserContext;
export const AddStocks = withStyles(styles)(PureAddStocks);















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