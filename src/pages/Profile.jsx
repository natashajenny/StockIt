import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";
import { UserContext } from "../UserContext";
import userPhoto from "./userPhoto.png";

export class PureProfile extends React.Component {
  render() {
    const { classes } = this.props;
    const { user } = this.context;
    return (
      <div className={classes.root}>
        <h1>Profile</h1>
        <div className={classes.topCard}>
          <div className={classes.userCard}>
            <div className={classes.photoContainer}>
              <img className={classes.userPhoto} src={userPhoto} alt='cuteface' />
            </div>
            <div className={classes.userNameContainer}>
              <div className={classes.userName}>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="body1" style={{ marginTop: "20px" }}>
                  Email: {user.email}
                  <br />
                  User name: {user.login}
                  <br />
                  Phone: {user.phone}
                  <br />
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PureProfile.contextType = UserContext;

export const Profile = withStyles(styles)(PureProfile);
