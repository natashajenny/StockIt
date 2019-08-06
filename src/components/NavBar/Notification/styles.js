import { createStyles } from "@material-ui/core/styles";

export const styles = createStyles(theme => ({
  card: {
    width: 275,
    position: "relative",
    background: "#ffc107"
  },
  pos: {
    marginBottom: 12
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 8,
    borderRadius: 4
  }
}));
