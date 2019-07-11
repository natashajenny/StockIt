import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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

 export class UserRegister extends React.Component {
   

  
    // const handleChange = name => event => {
    //   setValues({ ...values, [name]: event.target.value });
    // };
    // width="48" height="48"
    render(){
        const { classes } = this.props;
    return (
    <Container maxWidth='xs'>
    <h1 align="Center" color='primary' > User Profile </h1>
        <form className={classes.container} noValidate autoComplete="off">
                <TextField
                id="userInput"
                label="Username"
                placeholder="Username"
                className={classes.textField}
                margin="normal"
                />
                <TextField
                id="-emailInput"
                label="Email"
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
                
      <Button color="primary" className={classes.button}>
        Submit
      </Button>
        </form>
      </Container>
    );
  }
}

export const Register = UserRegister;