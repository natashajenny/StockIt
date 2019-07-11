import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import Button from '@material-ui/core/Button';




 class PureUserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emaUserLogin: "",
      pasUserLogind: "",
    };
  }

  // validatUserLoginm() {
  //   returUserLoginis.state.email.length > 0 && this.state.password.length > 0;
  // }

  handleCUserLogine = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    console.log(event);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            {/* <ControlLabel>Email</ControlLabel> */}
            <label >
                Email
            </label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
          <label>
                Password
            </label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button variant="contained" color="primary" >
        Submit
      </Button>
        </form>
      </div>
    );
  }
}

export const UserLogin = (PureUserLogin);
