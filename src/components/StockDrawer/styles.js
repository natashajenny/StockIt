import { createStyles } from "@material-ui/core/styles";

const drawerWidth = 500;

export const styles = createStyles(theme => ({
  root: {
    display: "flex",
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    flexDirection: "column",
    alignItems: "center"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  logout: {
    font: "red"
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 8,
    borderRadius: 4
  }
}));
