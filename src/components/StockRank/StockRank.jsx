import React from 'react';
import {  Table, TableCell, TableHead, TableRow, TableBody, Button} from '@material-ui/core';
import APIClient from '../../api/apiClient.js';

import history from '../../history.js';

export class PureStockRank extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
        bot: [],
        top:[],
      }
    }
  
    
  handleCellClick(e){
    history.push(`/Stocks/${e}`)
  }
  componentDidMount(){
    this.apiClient = new APIClient();
    this.apiClient.gettopten()
      .then(json =>{
        this.setState({
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
    var {top, bot } = this.state;
    return (
      <div style={{display: 'grid', gridTemplateColumns: '0.25fr 1fr 0.25fr 1fr 0.25fr'}}>
        <div />
        <h1 style={{textAlign: 'center'}}> Top 10 </h1>
        <div />
        <h1 style={{textAlign: 'center'}}> Bottom 10 </h1>
        <div />
        <div />
        <Table  >
          <TableHead>
            <TableRow>
              <TableCell  align="center">Index</TableCell>    
              <TableCell  align="center">Company</TableCell>    
              <TableCell  align="center">Percentage Change</TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
          {top.map((item,index) => (
            <TableRow key={index+1} >
              <TableCell align="center">{index+1}</TableCell>         
              <TableCell onClick= {() => this.handleCellClick(item.company)} key={item.company} align="center" >
                  <Button variant="contained" color="primary" >
                    {item.company}
                  </Button>
              </TableCell>
              {item.change_pct > 0 ? 
                <TableCell style={{color: 'green'}} align="center">{(item.change_pct*100).toFixed(2)}</TableCell>
                :
                <TableCell style={{color: 'red'}} align="center">{(item.change_pct*100).toFixed(2)}</TableCell>
              }
            </TableRow>
          ))}
          </TableBody>
        </Table> 
        <div />
        <Table  >
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>         
              <TableCell align="center">Company</TableCell>    
              <TableCell align="center">Percentage Change</TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
          {bot.map((item,index) => (
            <TableRow key={index+1} >
              <TableCell align="center">{index+1}</TableCell>         
              <TableCell onClick= {() => this.handleCellClick(item.company)} key={item.company} align="center" >
                <Button variant="contained" color="primary" >
                  {item.company}
                </Button>
              </TableCell>
              {item.change_pct > 0 ? 
                <TableCell style={{color: 'green'}} align="center">{(item.change_pct*100).toFixed(2)}</TableCell>
                :
                <TableCell style={{color: 'red'}} align="center">{(item.change_pct*100).toFixed(2)}</TableCell>
              }
            </TableRow>
          ))}
          </TableBody>
        </Table> 
        <div />
      </div>
    );  
  }
}

export const StockRank= (PureStockRank);




