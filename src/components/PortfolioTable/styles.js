import { createStyles } from "@material-ui/core/styles";

export const styles = createStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  row: {
    padding: 0
  },
  cell: {
    padding: 5
  },
  darkBackdrop: {
    zIndex: 1110,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "black",
    opacity: 0.7
  },
  predictionGraphContainer: {
    zIndex: 1111,
    maxWidth: 800,
    height: "auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "40px 40px 24px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 8,
    borderRadius: 4
  }
}));
