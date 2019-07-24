import * as React from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

import { styles } from './styles';
import history from '../../history.js';

class PureSearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
    }
  }
  handleSearch = (event) => {
    if(event.key === 'Enter') {
      history.push(`/search?${event.target.value}`)
      event.target.value = ''
    }
  }
  render() {
    const { classes } = this.props
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
          onKeyPress={this.handleSearch}
        />
      </div>
    )
  }
}

export const SearchBar = withStyles(styles)(PureSearchBar);