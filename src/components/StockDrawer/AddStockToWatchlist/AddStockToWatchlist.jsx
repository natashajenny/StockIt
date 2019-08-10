import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";

class PureAddStockToWatchlist extends React.Component {
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
      processing: false
    };
    this.fieldNames = [
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

  computeValue = (i, currentPrice) => {
    if (i === 1) return 1.25 * currentPrice;
    if (i === 2) return 0.75 * currentPrice;
    if (i === 3) return 0.6 * currentPrice;
    if (i === 4) return 0.5 * currentPrice;
    if (i === 5) return 1.5 * currentPrice;
    if (i === 6) return 1.4 * currentPrice;
  };

  handleSubmit = (e, formData, onSubmit) => {
    this.setState({
      processing: true
    })
    onSubmit(e, formData)
  }

  componentDidMount = () => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        code: {
          ...this.state.code,
          data: this.props.stock.company
        },
        [this.fieldNames[1]]: {
          ...formData[this.fieldNames[1]],
          data: this.computeValue(1, this.props.stock.closing).toFixed(2)
        },
        [this.fieldNames[2]]: {
          ...formData[this.fieldNames[2]],
          data: this.computeValue(2, this.props.stock.closing).toFixed(2)
        },
        [this.fieldNames[3]]: {
          ...formData[this.fieldNames[3]],
          data: this.computeValue(3, this.props.stock.closing).toFixed(2)
        },
        [this.fieldNames[4]]: {
          ...formData[this.fieldNames[4]],
          data: this.computeValue(4, this.props.stock.closing).toFixed(2)
        },
        [this.fieldNames[5]]: {
          ...formData[this.fieldNames[5]],
          data: this.computeValue(5, this.props.stock.closing).toFixed(2)
        },
        [this.fieldNames[6]]: {
          ...formData[this.fieldNames[6]],
          data: this.computeValue(6, this.props.stock.closing).toFixed(2)
        }
      },
      currentPrice: this.props.stock.closing
    });
  };

  render() {
    const { onSubmit, classes } = this.props;
    const { formData, currentPrice } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: "57%", marginTop: "10px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            onSubmit={e => this.handleSubmit(e, formData, onSubmit)}
          >
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
                width: "100%"
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: "20px",
                width: "100%"
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
                    label={fieldName}
                    value={formData[fieldName]["data"]}
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
              <Button disabled={this.state.processing} type="submit" color="primary" variant="contained">
                <Typography variant="button">Submit</Typography>
              </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export const AddStockToWatchlist = withStyles(styles)(PureAddStockToWatchlist);
