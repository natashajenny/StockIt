import React from "react";
import { Button, IconButton, Paper, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";

class PureDeleteModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      processing: false,
    }
  }

  handleDelete = () => {
    this.setState({
      processing: true,
    })
    this.props.onDelete()
  }

  render() {
    const { onClose, name, classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose} />
        <form>
          <Paper className={classes.modal}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            <Typography variant="h6">
              Are you sure you want to delete {name}?
            </Typography>
            <div className={classes.buttons}>
              <Button disabled={this.state.processing} color="primary" variant="contained" onClick={this.handleDelete}>
                <Typography variant="button">Yes</Typography>
              </Button>
              <Button disabled={this.state.processing} color="secondary" variant="contained" onClick={onClose}>
                <Typography variant="button">No</Typography>
              </Button>
            </div>
          </Paper>
        </form>
      </React.Fragment>
    );
  }
}

export const DeleteModal = withStyles(styles)(PureDeleteModal);
