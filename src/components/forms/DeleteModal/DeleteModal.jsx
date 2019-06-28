import React from 'react';
import { Button, IconButton, Paper, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';

class PureDeleteModal extends React.Component {
  render() {
    const { onClose, classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose}/>
        <form>
          <Paper className={classes.modal}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            <Typography variant='h6'>
              Are you sure you want to delete [NAME]?
            </Typography>
            <div className = {classes.buttons}>
              <Button color='primary' variant='contained'>
                <Typography variant='button'>
                  Yes
                </Typography>
              </Button>
              <Button color='secondary' cariant='contained'>
                <Typography variant='button'>
                  No
                </Typography>
              </Button>
            </div>
          </Paper>
        </form>
      </React.Fragment>
    );
  }
}

export const DeleteModal = withStyles(styles)(PureDeleteModal);
