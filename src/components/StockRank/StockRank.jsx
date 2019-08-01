import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { styles } from './styles';
// import { PerformanceChart } from '../components/PerformanceChart/PerformanceChart';
import {  Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
import APIClient from '../../api/apiClient.js';
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
            
           
    <div>
        <h1> Top 10 Stocks </h1>
            <Table  >
              <TableHead>
                <TableRow>
                <TableCell  align="center">index</TableCell>
                    <TableCell  align="center">company</TableCell>    
                    </TableRow>
              </TableHead> 
                <TableBody>
                {top.map((item,index) => (
                <TableRow key={index+1} >
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell style={{color:'green'}} align="center">{item.company}</TableCell>         
                </TableRow>
              ))}
                </TableBody>
            </Table> 
            <h1> Bottom 10 Stocks </h1>
            <Table  >
              <TableHead>
                <TableRow>
                <TableCell  align="center">index</TableCell>
                    <TableCell  align="center">company</TableCell>    
                    </TableRow>
              </TableHead> 
                <TableBody>
                {bot.map((item,index) => (
                <TableRow key={index+1} >
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell style={{color: 'red'}} align="center">{item.company}</TableCell>         
                </TableRow>
              ))}
                </TableBody>
            </Table> 
        </div>
    );  
    // }
    }
}

export const StockRank= (PureStockRank);




