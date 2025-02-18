import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, Button } from '@material-ui/core';
import { AttachMoney, Timeline, TableChart } from '@material-ui/icons';

import { styles } from './styles';
import { SearchBar } from '../components';
import { UserContext } from '../UserContext';
import history from '../history';

export class PureHome extends React.Component {
    handleClick = (address) => {
        history.push(`/${address}`)
    }

    render() {
        const { classes } = this.props;
        const { isLoggedIn, user } = this.context;
        return (
            <div className = {classes.root}>
                {isLoggedIn ? 
                    <div>
                        <Typography variant='h4' className={classes.welcome}>
                            Welcome Back, {user.name}
                        </Typography>
                        <div className = {classes.userHome}>
                            <Paper>
                                <div className = {classes.panel}>
                                    <TableChart fontSize='large'/>
                                    <Typography variant='body1' className={classes.title}>
                                        Manage your stock portfolios
                                         and easily make decision with the future price prediction.
                                    </Typography>
                                    <Button onClick={() => this.handleClick('Portfolio')}>
                                        <Typography variant='button' noWrap>
                                            Explore More
                                        </Typography>
                                    </Button>
                                </div>
                            </Paper>          
                            <Paper>
                                <div className = {classes.panel}>
                                    <Timeline fontSize='large'/>
                                    <Typography variant='body1' className={classes.title}>
                                        Analyse the performance of your portfolios through
                                        the metrics page.
                                    </Typography>
                                    <Button onClick={() => this.handleClick('Metrics')}>
                                        <Typography variant='button' noWrap>
                                            Explore More
                                        </Typography>
                                    </Button>
                                </div>
                            </Paper>     
                            <Paper>
                                <div className = {classes.panel}>
                                    <AttachMoney fontSize='large'/>
                                    <Typography variant='body1' className={classes.title}>
                                        Add stocks into your watchlist to observe their price trend.
                                    </Typography>
                                    <Button onClick={() => this.handleClick('Watchlist')}>
                                        <Typography variant='button' noWrap>
                                            Explore More
                                        </Typography>
                                    </Button>
                                </div>
                            </Paper>          
                        </div>
                    </div>
                    :
                    <div className = {classes.home}>
                        <Typography variant='h1' className={classes.title}>
                            Stock It
                        </Typography>                
                        <div className={classes.searchBar}>
                            <SearchBar />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

PureHome.contextType = UserContext;

export const Home = withStyles(styles)(PureHome);
