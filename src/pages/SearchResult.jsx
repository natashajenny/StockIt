import React from 'react';
import { Link, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import history from '../history.js';
import * as stockCodes from '../mock/stock_code.js';

export class PureSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredResults: null,
            searchInput: '',
        }
    }

    componentDidMount = () => {
        const searchInput = this.props.location.search.split('?')[1];
        this.setState({
            filteredResults: stockCodes.suggestions.filter(code => 
                code.label.search(searchInput.toUpperCase()) !== -1 ||
                code.value.search(searchInput.toUpperCase()) !== -1
            ),
            searchInput,
        })
    }

    shouldComponentUpdate = (nextProps) => {
        const searchInput = nextProps.location.search.split('?')[1];
        if (searchInput === this.state.searchInput) return false;
        return true;
    }

    componentDidUpdate = () => {
        const searchInput = this.props.location.search.split('?')[1];
        this.setState({
            filteredResults: stockCodes.suggestions.filter(code => 
                code.label.search(searchInput.toUpperCase()) !== -1 ||
                code.value.search(searchInput.toUpperCase()) !== -1
            ),
            searchInput,
        })
    }

    render() {
        const { classes } = this.props;
        const { filteredResults } = this.state;
        return (
            <div className = {classes.root}>
                <h1> Search Result </h1>
                <div className = {classes.searchResult}>
                    { filteredResults && filteredResults.map(result =>(
                        <Paper className = {classes.searchResultPaper}>
                            <div className = {classes.searchResultPanel}>
                                <Typography variant='h6'>
                                    <Link component='button' variant='h6' onClick={() => history.push(`/Stocks/${result.label}`)}>
                                        {result.label}
                                    </Link>
                                </Typography>
                                <Typography variant='caption'>
                                    {result.value}
                                </Typography>
                            </div>
                        </Paper> 
                        ))
                    }
                </div>    
            </div>
        );  
    }
}

export const SearchResult = withStyles(styles)(PureSearchResult);
