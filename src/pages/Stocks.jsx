import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Stocklist, StockRank } from '../components';
import { styles } from './styles';
import APIClient from '../api/apiClient.js';

export class PureStocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }
    componentDidMount() {
        this.apiClient = new APIClient();
        this.apiClient.getStocks()
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json.stocks,
                })
            });
    }

    render() {
        var { isLoaded, items } = this.state;
        const { classes } = this.props;
        if (!isLoaded) {
            return <div>Loading....</div>
        } else {
            return (
                <div className={classes.root}>
                    <h1> Stocks </h1>
                    <StockRank />
                    <Stocklist items={items} />
                </div>
            );
        }
    }
}

export const Stocks = withStyles(styles)(PureStocks);