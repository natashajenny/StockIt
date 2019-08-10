import React from "react";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { SearchAutoFill } from "../../SearchAutoFill";
import { styles } from "./styles";
import APIClient from "../../../api/apiClient.js";

class PureAddStockModal extends React.Component {
  constructor(props) {
    super(props);
    const emptyData = { data: "" };
    this.state = {
      formData: {
        code: emptyData,
        price: emptyData,
        quantity: emptyData
      },
      currentPrice: "",
      processing: false,
    };
    this.fieldNames = ["code", "current_price", "price", "quantity"];
  }

  handleInputChange = (name, value) => {
    const { formData } = this.state;
    if (name === "code") {
      this.apiClient.getStockDetails(value).then(data => {
        this.setState({
          formData: {
            ...formData,
            [name]: {
              ...formData[name],
              data: value
            }
          },
          currentPrice: data.details.closing
        });
      });
    } else {
      this.setState({
        formData: {
          ...formData,
          [name]: {
            ...formData[name],
            data: value
          }
        }
      });
    }
  };

  handleSubmit = (e, formData, onSubmit) => {
    this.setState({
      processing: true,
    })
    onSubmit(e, formData)
  }

  componentDidMount = () => {
    this.apiClient = new APIClient();
  };

  render() {
    const { onClose, onSubmit, classes } = this.props;
    const { formData, currentPrice } = this.state;
    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose} />
        <form onSubmit={e => this.handleSubmit(e, formData, onSubmit)}>
          <Paper className={classes.modal}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            <Typography variant="h4">Add New Stock</Typography>
            {this.fieldNames.map((fieldName, i) =>
              i !== 0 ? (
                <TextField
                  required={i !== 1}
                  disabled={i === 1}
                  key={i}
                  className={classes.textField}
                  onChange={e =>
                    this.handleInputChange(e.target.name, e.target.value)
                  }
                  name={fieldName}
                  InputLabelProps={
                    i === 1 && {
                      shrink: true
                    }
                  }
                  label={i === 1 ? "current price" : fieldName}
                  value={i === 1 ? currentPrice : formData[fieldName]["data"]}
                  autoComplete="off"
                  InputProps={
                    i === 1 && {
                      readOnly: true
                    }
                  }
                />
              ) : (
                <div className={classes.codeInput}>
                  <SearchAutoFill handleChange={this.handleInputChange} />
                </div>
              )
            )}
            <div className={classes.buttons}>
              <Button disabled={this.state.processing} color="secondary" variant="contained" onClick={onClose}>
                <Typography variant="button">Cancel</Typography>
              </Button>
              <Button disabled={this.state.processing} type="submit" color="primary" variant="contained">
                <Typography variant="button">Submit</Typography>
              </Button>
            </div>
          </Paper>
        </form>
      </React.Fragment>
    );
  }
}

export const AddStockModal = withStyles(styles)(PureAddStockModal);
