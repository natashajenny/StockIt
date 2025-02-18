import * as React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ExitToApp, AccountCircle } from "@material-ui/icons";

import { styles } from "./styles";
import history from "../../history";
import { UserContext } from "../../UserContext";

class PureResponsiveDrawer extends React.Component {
  handleClick = key => {
    this.props.handleDrawerToggle();
    history.push(`/${key}`);
  };

  handleLogOut = logOut => {
    this.props.handleDrawerToggle();
    logOut();
  };

  render() {
    const { classes, mobileOpen, handleDrawerToggle } = this.props;
    const { user, isLoggedIn, logOut } = this.context;
    return (
      <Drawer
        className={classes.drawer}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className={classes.toolbar} />
        {isLoggedIn && (
          <div>
            <List>
              <ListItem
                button
                key="Profile"
                onClick={() => this.handleClick("Profile")}
              >
                <AccountCircle fontSize="large" />
                <ListItemText primary={user.name} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                key="Portfolio"
                onClick={() => this.handleClick("Portfolio")}
              >
                <ListItemText primary="My Portfolio" />
              </ListItem>
              <ListItem
                button
                key="Watchlist"
                onClick={() => this.handleClick(`Watchlist`)}
              >
                <ListItemText primary="Watchlist" />
              </ListItem>
              <ListItem
                button
                key="Metrics"
                onClick={() => this.handleClick(`Metrics`)}
              >
                <ListItemText primary="Metrics" />
              </ListItem>
              <ListItem
                button
                key="Stocks"
                onClick={() => this.handleClick(`Stocks`)}
              >
                <ListItemText primary="Stocks" />
              </ListItem>
            </List>
            <Divider />
          </div>
        )}
        <List>
          <ListItem
            button
            key="Settings"
            onClick={() => this.handleClick(`Settings`)}
          >
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            key="AboutUs"
            onClick={() => this.handleClick(`AboutUs`)}
          >
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
        {isLoggedIn && (
          <div>
            <Divider />
            <List>
              <ListItem
                button
                key="Logout"
                onClick={() => this.handleLogOut(logOut)}
              >
                <ListItemIcon>
                  <ExitToApp color="error" />
                </ListItemIcon>
                <Typography color="error">
                  <ListItemText primary="Logout" disableTypography />
                </Typography>
              </ListItem>
            </List>
          </div>
        )}
      </Drawer>
    );
  }
}

PureResponsiveDrawer.contextType = UserContext;

export const ResponsiveDrawer = withStyles(styles)(PureResponsiveDrawer);
