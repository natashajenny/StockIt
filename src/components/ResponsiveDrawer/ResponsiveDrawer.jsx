import * as React from 'react';
import { Divider, Drawer, List, ListItem, ListItemText, 
    ListItemIcon, Typography, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';

import { styles } from './styles';
import history from '../../history';

class PureResponsiveDrawer extends React.Component {
    render() {
        const { classes } = this.props;
        const { mobileOpen, handleDrawerToggle } = this.props;
        return (
            <Drawer 
                className={classes.drawer} 
                variant="temporary" 
                open = {mobileOpen}
                onClose= {handleDrawerToggle}
                classes={{ paper: classes.drawerPaper }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className={classes.toolbar} />
                <Typography>
                    <Link className={classes.link} onClick={() => history.push(`/Profile`)}>Link to User profile</Link>
                </Typography>
                <Divider />
                <List>
                    <ListItem button key = 'Portfolio' onClick ={() => history.push(`/Portfolio`)}>
                        <ListItemText primary = 'My Portfolio' />
                    </ListItem>
                    <ListItem button key = 'Watchlist' onClick ={() => history.push(`/Watchlist`)}>
                        <ListItemText primary = 'Watchlist' />
                    </ListItem>
                    <ListItem button key = 'Metrics' onClick ={() => history.push(`/Metrics`)}>
                        <ListItemText primary = 'Metrics' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key = 'Tutorial' onClick ={() => history.push(`/Tutorial`)}>
                        <ListItemText primary = 'Tutorial' />
                    </ListItem>
                    <ListItem button key = 'Settings' onClick ={() => history.push(`/Settings`)}>
                        <ListItemText primary = 'Settings' />
                    </ListItem>
                    <ListItem button key = 'AboutUs' onClick ={() => history.push(`/AboutUs`)}>
                        <ListItemText primary = 'About Us' />
                    </ListItem>
                    <ListItem button key = 'Logout'>
                        <ListItemIcon><ExitToApp color = 'error' /></ListItemIcon>
                        <Typography color = 'error'>
                            <ListItemText primary = 'Logout' disableTypography />
                        </Typography>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
};

export const ResponsiveDrawer = withStyles(styles)(PureResponsiveDrawer);