import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button
} from "@material-ui/core";
import { SubdirectoryArrowRight, Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";
import history from "../../../history.js";

export class PureNotification extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{ position: "fixed", right: 10, bottom: 10 }}>
        <Card className={classes.card}>
          <div style={{ margin: 10 }}>
            <IconButton size="small" className={classes.closeButton}>
              <Close />
            </IconButton>
            <CardContent style={{ marginTop: 15 }}>
              <Typography variant="body2" color="textSecondary">
                Stock [name] has reached a price of [price]
              </Typography>
            </CardContent>
            <CardActions style={{ padding: 0 }}>
              <IconButton
                size="small"
                onClick={() => {
                  history.push("/Watchlist");
                }}
              >
                <SubdirectoryArrowRight />
              </IconButton>
              <Button
                size="small"
                onClick={() => {
                  history.push("/Watchlist");
                }}
              >
                Go to Watchlist
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

// PureNotification.contextType = UserContext;

export const Notification = withStyles(styles)(PureNotification);
