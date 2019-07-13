import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, IconButton, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { styles } from './styles';

class PureLoginModal extends React.Component {
  handleSubmit = (onSubmit, onClose) => {
    onSubmit()
    onClose()
  }

  render() {
    const { classes, onClose, onSubmit } = this.props;
    console.log(onSubmit);
    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose}/>
        <form>
          <Paper className={classes.modal}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            <TextField required label='Username' className={classes.textField} />
            <TextField required label='Password' className={classes.textField} type='password'/>
            <Button className={classes.loginButton} color='primary' variant='contained' onClick={() => this.handleSubmit(onSubmit, onClose)}>
              <Typography className={classes.loginText} variant='button'>
                Login
              </Typography>
            </Button>
            <Button className={classes.forgotButton}>
              <Typography className={classes.forgotButton} variant='button'>
                Forgot password?
              </Typography>
            </Button>
          </Paper>
        </form>
      </React.Fragment>
    );
  }
}

export const LoginModal = withStyles(styles)(PureLoginModal);
