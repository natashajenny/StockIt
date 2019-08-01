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
    padding: "0px"
  }
}));
