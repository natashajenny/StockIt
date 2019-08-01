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
      }
    };
    this.fieldNames = [
      "code",
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
    this.setState({
      formData: {
        ...formData,
        [name]: {
          ...formData[name],
          data: value
        }
      }
    });
  };

  render() {
    const { onClose, onSubmit, classes } = this.props;
    const { formData } = this.state;
    console.log(formData);
    return (
      <React.Fragment>
        <div className={classes.darkBackdrop} onClick={onClose} />
        <form onSubmit={e => onSubmit(e, formData)}>
          <Paper className={classes.modal}>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <Close />
            </IconButton>
            <Typography variant="h4">Add New Stock</Typography>
            <div className={classes.codeInput}>
              <SearchAutoFill handleChange={this.handleInputChange} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: "35px",
                width: "70%"
              }}
            >
              {this.fieldNames.map((fieldName, i) =>
                i !== 0 && i !== 7 ? (
                  <TextField
                    key={i}
                    className={classes.textField}
                    onChange={e =>
                      this.handleInputChange(e.target.name, e.target.value)
                    }
                    name={fieldName}
                    error={formData[fieldName].error !== undefined}
                    helperText={formData[fieldName].error}
                    label={fieldName}
                    autoComplete="off"
                  />
                ) : (
                  i === 7 && (
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
              <Button color="secondary" variant="contained" onClick={onClose}>
                <Typography variant="button">Cancel</Typography>
              </Button>
              <Button type="submit" color="primary" variant="contained">
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
