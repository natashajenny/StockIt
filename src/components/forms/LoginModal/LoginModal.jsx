import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, IconButton, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { styles } from './styles';
import APIClient from '../../../api/apiClient.js';
import history from '../../../history';

class PureLoginModal extends React.Component {
  constructor(props) {
    super(props)
    const emptyData = { data: '' };
    this.state = {
      formData: {
          username: emptyData,
          password: emptyData,
      }
    }; 
    this.formConfig =  {
      username: { label: 'Username' },
      password: { label: 'Password', type: 'password', onBlur: this.handlePasswordBlur, ref: this.passwordRef },
    };
  }
  
  handleInputChange = (e) => {
    const { formData } = this.state;
    this.setState({
        formData: {
            ...formData,
            [e.target.name]: {
                ...formData[e.target.name],
                data: e.target.value,
            },
        },
    });
  }

  handleSubmit = (e, formData, onSubmit, onClose) => {
    e.preventDefault();
    this.apiClient = new APIClient();
    this.apiClient.loginUser(formData).then((data) => {
      onSubmit(data.user)
    }).then(onClose()).then(history.push('/Home'))
  }

  render() {
    const { classes, onClose, onSubmit } = this.props;
    const { formData } = this.state;
    const { formConfig } = this;
    console.log(formData);
    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose}/>
        <form onSubmit={(e) => this.handleSubmit(e, formData, onSubmit, onClose)}>
          <Paper className={classes.modal}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            { Object.keys(formConfig).map((fieldName, i) => (
              <TextField
                  required
                  key={i}
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  name={fieldName}
                  error={formData[fieldName].error !== undefined}
                  helperText={formData[fieldName].error}
                  inputRef={formConfig[fieldName].ref}
                  onBlur={formConfig[fieldName].onBlur}
                  label={formConfig[fieldName].label}
                  type={formConfig[fieldName].type}
                  autoComplete={formConfig[fieldName].autoComplete}
                  />
            ))}
            <Button type='submit' className={classes.loginButton} color='primary' variant='contained'>
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
