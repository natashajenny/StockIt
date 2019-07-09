import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

 function TextFields() {
    const classes = useStyles();

  
    // const handleChange = name => event => {
    //   setValues({ ...values, [name]: event.target.value });
    // };
    // width="48" height="48"
    return (
    <Container maxWidth='xs'>
    <h1 align="Center" color='primary' > User Profile </h1>
        <form className={classes.container} noValidate autoComplete="off">
                <TextField
                id="standard-with-placeholder"
                label="Username"
                type="password"
                placeholder="Username"
                className={classes.textField}
                margin="normal"
                />
                <TextField
                id="standard-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                /> 
        </form>
      </Container>
    );
  }

  export const Login = TextFields;