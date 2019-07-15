import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { styles } from './styles';

class PureSearchBar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Search' }}
                />
            </div>
        )
    }
}

export const SearchBar = withStyles(styles)(PureSearchBar);
