import React from "react";
import { CircularProgress } from "@material-ui/core";

export class LoadingBar extends React.Component {
  render() {
    return (
      <div
        style={{
          zIndex: 9999,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "black",
          opacity: 0.7
        }}
      >
        <div
          style={{
            position: "fixed",
            zIndex: 10000,
            top: "50%",
            left: "50%"
          }}
        >
          <CircularProgress disableShrink />
        </div>
      </div>
    );
  }
}
