import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';

// import coin from './coin.jpg'; 
import profits from './profits1.jpg';

import { styles } from './styles';

export class PureWatchItems extends React.Component {
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container  direction="row" justify="space-evenly" alignItems="baseline">
          <Container maxWidth="xs">
            <Paper className={classes.paper} alignContent="center">
              <Grid container  direction="row" spacing={3} alignItems="center"  >
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img}  alt="coin" src={profits} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={5} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs alignContent="center">
                      <Typography gutterBottom variant="subtitle1">
                                (ASX)
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                              High / Low
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                                SELL
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: 'pointer' }}>
                        Remove
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item alignContent="center">
                    <Typography variant="subtitle1"> CBA $4.00</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Container>
          <Container maxWidth="xs">
            <Paper className={classes.paper} alignContent="center">
              <Grid container  direction="row" spacing={3} alignItems="center"  >
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img}  alt="coin" src={profits} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={5} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs alignContent="center">
                      <Typography gutterBottom variant="subtitle1">
                                (ASX)
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                              High / Low
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                                SELL
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: 'pointer' }}>
                        Remove
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item alignContent="center">
                    <Typography variant="subtitle1"> CBA $4.00</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Container>
          </Grid>
      </div>
    );
  }
}

export const WatchItems = withStyles(styles)(PureWatchItems);