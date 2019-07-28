import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Select } from "@material-ui/core";

import { styles } from "./styles";
import { UserContext } from "../UserContext";

export class PureSettings extends React.Component {
  render() {
    const { classes } = this.props;
    const { settings, handleChangeNotification } = this.context;
    return (
      <div className={classes.root}>
        <h1> Settings </h1>
        <div className={classes.settingsNotification}>
          <Typography variant="h6">Notification = </Typography>
          <Select
            native
            value={settings.notification}
            onChange={handleChangeNotification}
            inputProps={{
              name: "notification-settings"
            }}
            style={{
              marginLeft: "10px"
            }}
          >
            <option key="on" value={true}>
              on
            </option>
            <option key="off" value={false}>
              off
            </option>
          </Select>
        </div>
      </div>
    );
  }
}

PureSettings.contextType = UserContext;

export const Settings = withStyles(styles)(PureSettings);
