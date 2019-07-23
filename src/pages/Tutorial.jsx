import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import {newsGrid} from '../components/NewsGrid/NewsGrid';
// import {Stocklist} from '../components/Stocklist/Stocklist';
// import {StockDrawer} from '../components/StockDrawer/StockDrawer';
import { styles } from './styles';

export class PureTutorial extends React.Component {
    render() {
        // var { isLoaded, items } = this.state;

    // if(!isLoaded){
        // {newsGrid()}
    //     return <div>Loading....</div>
    //   } else{
        // console.log(isLoaded);
        // console.log(items);
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> Tutorial </h1>
                {/* <Stocklist /> */}
                    {/* <ul> 
                    {console.log(items)};
                    {items.map(item => (
                        <li key={item.company}>
                            Code:{item.company}
                        </li>
                    ))};
             </ul>
                console.log(items); */}
            </div>
        );  
    }
}

export const Tutorial = withStyles(styles)(PureTutorial);
