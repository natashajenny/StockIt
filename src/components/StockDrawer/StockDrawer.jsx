import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles({
//     list: {
//       width: 250,
//     },
//     fullList: {
//       width: 'auto',
//     },
//   });
  
 class TempDrawer extends React.Component  {

     
    
    render(){
        return (
        <div>
        <Drawer anchor="bottom">
            <List>
                {['Add Stock', 'Search', 'Watchlist']}
            </List>
                <Divider />
            </Drawer>
        </div>
        );
    }
  }

  export const StockDrawer = TempDrawer;