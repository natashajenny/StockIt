import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

class PureGrapher extends React.Component {
  render() {
    const { data } = this.props;
    if (data === "") return <div>Graph is not fetched yet!</div>;

    return (
      <img
        src={`data:image/jpeg;base64,${data}`}
        alt="graph"
        style={{ maxWidth: "inherit" }}
      />
    );
  }
}

export const Grapher = withStyles(styles)(PureGrapher);
