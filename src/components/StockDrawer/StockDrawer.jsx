import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
// import { SearchAutoFill } from '../SearchAutoFill/SearchAutoFill';
import { UserContext } from '../../UserContext';
import Button from '@material-ui/core/Button';





const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

 function TempDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      right: false,
    });
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };
  
    const addClick = (text, index) =>{
        console.log("text:" + text + " index: " + index );
    }
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          {['Add To Portfolio', 'Add to Watchlist'].map((text, index) => (
            <ListItem button key={text} onClick={addClick(text,index)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
       </div>
    );
  
    return (
      <div>     
        <Button onClick={toggleDrawer('right', true)} variant="contained" color="primary">Add Stock</Button>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
          {sideList('right')}
        </Drawer>
      </div>
    );
  }
  

  TempDrawer.contextType = UserContext;
  export const StockDrawer = TempDrawer;