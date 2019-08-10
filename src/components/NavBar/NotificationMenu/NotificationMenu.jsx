import React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";

export class PureNotificationMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ position: "absolute", right: 10, top: 15 }}>
        <Card className={classes.card}>
          <div style={{ margin: 10 }}>
            <CardContent style={{ marginTop: 15 }}>
              <Typography variant="body2" color="textSecondary">
                Stock [name] has reached a price of [price]
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    );
  }
}

export const NotificationMenu = withStyles(styles)(PureNotificationMenu);
