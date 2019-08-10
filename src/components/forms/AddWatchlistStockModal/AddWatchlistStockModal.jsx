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

class PureAddWatchlistStockModal extends React.Component {
  constructor(props) {
    super(props);
    const emptyData = { data: "" };
    this.state = {
      formData: {
        code: emptyData,
        alert_high: emptyData,
        alert_low: emptyData,
        buy_high: emptyData,
        buy_low: emptyData,
        sell_high: emptyData,
        sell_low: emptyData,
        quantity: emptyData
      },
      currentPrice: "",
      processing: false,
    };
    this.fieldNames = [
      "code",
      "current_price",
      "alert_high",
      "alert_low",
      "buy_high",
      "buy_low",
      "sell_high",
      "sell_low",
      "quantity"
    ];
  }

  handleInputChange = (name, value) => {
    const { formData } = this.state;
    if (name === "code") {
      this.apiClient.getStockDetails(value).then(data => {
        this.setState({
          currentPrice: data.details.closing,
          formData: {
            ...formData,
            [name]: {
              ...formData[name],
              data: value
            },
            [this.fieldNames[2]]: {
              ...formData[this.fieldNames[2]],
              data: this.computeValue(2, data.details.closing).toFixed(2)
            },
            [this.fieldNames[3]]: {
              ...formData[this.fieldNames[3]],
              data: this.computeValue(3, data.details.closing).toFixed(2)
            },
            [this.fieldNames[4]]: {
              ...formData[this.fieldNames[4]],
              data: this.computeValue(4, data.details.closing).toFixed(2)
            },
            [this.fieldNames[5]]: {
              ...formData[this.fieldNames[5]],
              data: this.computeValue(5, data.details.closing).toFixed(2)
            },
            [this.fieldNames[6]]: {
              ...formData[this.fieldNames[6]],
              data: this.computeValue(6, data.details.closing).toFixed(2)
            },
            [this.fieldNames[7]]: {
              ...formData[this.fieldNames[7]],
              data: this.computeValue(7, data.details.closing).toFixed(2)
            }
          }
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

  computeValue = (i, currentPrice) => {
    if (i === 2) return 1.25 * currentPrice;
    if (i === 3) return 0.75 * currentPrice;
    if (i === 4) return 0.6 * currentPrice;
    if (i === 5) return 0.5 * currentPrice;
    if (i === 6) return 1.5 * currentPrice;
    if (i === 7) return 1.4 * currentPrice;
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
            <div className={classes.codeInput}>
              <SearchAutoFill handleChange={this.handleInputChange} />
            </div>
            <TextField
              disabled
              className={classes.textField}
              onChange={e =>
                this.handleInputChange(e.target.name, e.target.value)
              }
              name={"current price"}
              InputLabelProps={{
                shrink: true
              }}
              label="current price"
              value={currentPrice}
              autoComplete="off"
              InputProps={{
                readOnly: true
              }}
              style={{
                width: "83%",
                alignSelf: "flex-end"
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: "35px",
                width: "70%"
              }}
            >
              {this.fieldNames.map((fieldName, i) =>
                i !== 0 && i !== 1 && i !== 8 ? (
                  <TextField
                    disabled={i === 1}
                    key={i}
                    className={classes.textField}
                    onChange={e =>
                      this.handleInputChange(e.target.name, e.target.value)
                    }
                    name={fieldName}
                    label={fieldName}
                    value={formData[fieldName]["data"]}
                    autoComplete="off"
                  />
                ) : (
                  i === 8 && (
                    <TextField
                      key={i}
                      onChange={e =>
                        this.handleInputChange(e.target.name, e.target.value)
                      }
                      name={fieldName}
                      error={formData[fieldName].error !== undefined}
                      helperText={formData[fieldName].error}
                      label={fieldName}
                      autoComplete="off"
                      style={{ gridColumn: "2 span" }}
                    />
                  )
                )
              )}
            </div>
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

export const AddWatchlistStockModal = withStyles(styles)(
  PureAddWatchlistStockModal
);
