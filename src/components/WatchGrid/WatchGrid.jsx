import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
}));

function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column"
  justify="space-evenly"
  alignItems="center">
        <Grid item xs >
          <Paper className={classes.paper} >Code:A2M |
                BoughtPrice: "21.22"|
                CurPrice: "13.22"|
                Chg: "-0.32"|
                High: "13.48|
                Low: "13.16|</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          Code:A2M |
                BoughtPrice: "21.22"|
                CurPrice: "13.22"|
                Chg: "-0.32"|
                High: "13.48|
                Low: "13.16|
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          Code:A2M |
                BoughtPrice: "21.22"|
                CurPrice: "13.22"|
                Chg: "-0.32"|
                High: "13.48|
                Low: "13.16|
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export const WatchGrid = AutoGrid;