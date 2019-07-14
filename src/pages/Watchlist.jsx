import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { WatchItems,PortfolioTable} from '../components';
import { styles } from './styles';

export class PureWatchlist extends React.Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
            {/* <NavBar /> */}
            <h1> Watchlist </h1>
            <PortfolioTable />
            <div className = {classes.root}>
                <WatchItems />
                <WatchItems />
            </div>
        </div>
        );  
    }
}

export const Watchlist = withStyles(styles)(PureWatchlist);
