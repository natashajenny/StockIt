import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "./styles";

class PureAddStockToPortfolio extends React.Component {
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
    this.fieldNames = ["current_price", "price", "quantity"];
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

  handleSubmit = (e, formData, onSubmit) => {
    this.setState({
      processing: true
    })
    onSubmit(e, formData)
  }

  componentDidMount = () => {
    this.setState({
      formData: {
        ...this.state.formData,
        code: {
          ...this.state.code,
          data: this.props.stock.company
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
          <form onSubmit={e => this.handleSubmit(e, formData, onSubmit)}>
            {this.fieldNames.map((fieldName, i) => (
              <TextField
                required={i !== 0}
                disabled={i === 0}
                key={i}
                className={classes.textField}
                onChange={e =>
                  this.handleInputChange(e.target.name, e.target.value)
                }
                name={fieldName}
                InputLabelProps={
                  i === 0 && {
                    shrink: true
                  }
                }
                label={i === 0 ? "current price" : fieldName}
                value={i === 0 ? currentPrice : formData[fieldName]["data"]}
                autoComplete="off"
                InputProps={
                  i === 0 && {
                    readOnly: true
                  }
                }
              />
            ))}
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

export const AddStockToPortfolio = withStyles(styles)(PureAddStockToPortfolio);
