import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';

// import coin from './coin.jpg'; 
import profits from './profits.jpg';

// import { styles } from './styles';

export const useStyles = makeStyles(theme => ({
    root: {
    //   flexGrow: 1,
      MaxHeight: 100,
    },
    paper: {
      padding: theme.spacing(2),
    //   margin: 'auto',
      maxWidth: 100,
    },
    image: {
      width: 50,
      height: 50,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '50%',
      maxHeight: '50%',
    },
  }));

 function Item() {
    const classes = useStyles;
  return (
    <div className={classes.root}>
    <Container maxWidth="sm">
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
    </div>
  );
}

export const WatchItems = Item;