import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { NavBar, WatchItems, WatchGrid } from '../components';
import { styles } from './styles';

export class PureWatchlist extends React.Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
            <NavBar />
            <h1> Watchlist </h1>
            <WatchGrid />
            <WatchItems />
            <WatchItems />
            <WatchItems />
            <WatchItems />
            <WatchItems />
            <div className = {classes.root}>
               
            </div>
        </div>
        );  
    }
}

export const Watchlist = withStyles(styles)(PureWatchlist);
