import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, 
  MenuItem, Menu, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { SearchBar, ResponsiveDrawer, RegisterModal, LoginModal } from '../';
import { UserContext } from '../../UserContext';
import history from '../../history';

class PureNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isMenuOpen: false,
      isMobileDrawerOpen: false,
      isMobileMenuOpen: false,
      isLoginOpen: false,
      isRegisterOpen: false,
    };
  }
  handleProfileMenuOpen = (event) => {
    history.push('/Profile')
  }
  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null,
    })
  }
  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    })
    this.state.handleMobileMenuClose();
  }
  handleMobileMenuOpen = (event) => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget,
    })
  }
  handleDrawerToggle = () => {
    this.setState({
      isMobileDrawerOpen: !this.state.isMobileDrawerOpen,
    })
  }
  openLoginModal = () => {
    this.setState({ isLoginOpen: true });
  }

  closeLoginModal = () => {
      this.setState({ isLoginOpen: false });
  }

  openRegisterModal = () => {
      this.setState({ isRegisterOpen: true });
  }

  closeRegisterModal = () => {
      this.setState({ isRegisterOpen: false });
  }
  render() {
    const menuId = 'primary-search-account-menu';
    const { classes } = this.props;
    const { logIn, isLoggedIn } = this.context;
    const { isLoginOpen, isRegisterOpen } = this.state;
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="Show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="Account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  
    return (
          <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                <Button onClick={() => history.push('/Home')}>
                  <Typography className={classes.title} variant="button" noWrap>
                    Stock It                    
                  </Typography>
                </Button>
                { isLoggedIn && <SearchBar /> }
                <div className={classes.grow} />
                  {isLoggedIn ?
                    <div>
                      <div className={classes.sectionDesktop}>
                        <IconButton aria-label="notifications" color="inherit">
                          <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                          </Badge>
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="Account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={this.handleProfileMenuOpen}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                      </div>
                      <div className={classes.sectionMobile}>
                        <IconButton
                          aria-label="Show more"
                          aria-controls={mobileMenuId}
                          aria-haspopup="true"
                          onClick={this.handleMobileMenuOpen}
                          color="inherit"
                        >
                          <MoreIcon />
                        </IconButton>
                      </div>
                    </div>
                    :
                    <div>
                      <Button onClick={this.openRegisterModal}>
                        <Typography className={classes.title} variant="button" noWrap>
                          Register
                        </Typography>
                      </Button>
                      <Button onClick={this.openLoginModal}>
                        <Typography className={classes.title} variant="button" noWrap>
                          Login
                        </Typography>
                      </Button>
                    </div>
                  }
                </Toolbar>
              </AppBar>
              {renderMobileMenu}
              {renderMenu}
              <ResponsiveDrawer 
                handleDrawerToggle = {this.handleDrawerToggle}
                mobileOpen = {this.state.isMobileDrawerOpen} 
              />
              {isLoginOpen && <LoginModal onClose={this.closeLoginModal} onSubmit={logIn} />}
              {isRegisterOpen && <RegisterModal onClose={this.closeRegisterModal} onSubmit={logIn}/>}
            </div>
    );
  }  
}

PureNavBar.contextType = UserContext;

export const NavBar = withStyles(styles)(PureNavBar);