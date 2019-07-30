<<<<<<< HEAD
import {  createStyles } from "@material-ui/core/styles";
=======
import { createStyles } from "@material-ui/core/styles";
>>>>>>> 68d2ac2c8de2b5ad92bd5e1502caebaad6243932

export const styles = createStyles(theme => ({
  root: {
    marginTop: theme.spacing(7.5),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10)
  },
  welcome: {
    textAlign: "center",
    paddingBottom: "10vh",
    paddingTop: "15vh"
  },
  refreshButton: {
    marginLeft: "10px"
  },
  addStockButton: {
    marginLeft: "auto",
    marginRight: "10px"
  },
  portfolioSubheading: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  home: {
    paddingTop: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  userHome: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  },
  panel: {
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    width: "250px",
    padding: "40px"
  },
  title: {
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  homePaper: {
    margin: "10px"
  },
  searchResult: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr"
  },
  searchResultPanel: {
    flexDirection: "row",
    margin: "10px",
    width: "200px"
  },
  searchResultPaper: {
    margin: "10px"
  },
  header: {
    marginTop: 12
  },
  topPanel: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr"
  },
  imageContainer: {
    position: "relative",
    width: 250
  },
  userImage: {
    width: "100%"
  },
  overlayImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "auto",
    height: "60%",
    transform: "translate(-50%, -50%)",
    opacity: 0.7
  },
  topCard: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10
  },
  userCard: {
    display: "flex",
    flexDirection: "row"
  },
  userPhoto: {
    display: "inline",
    height: "200px",
    width: "200px"
  },
  photoContainer: {
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 5,
    boxShadow: "0px 0px 5px -2px #888",
    minWidth: 200,
    maxWidth: 200,
    height: "200px",
    overflow: "hidden",
    position: "relative"
  },
  userNameContainer: {
    height: "100%",
    display: "flex"
  },
  userName: {
    height: "100%",
    width: "100%",
    padding: "30px",
    position: "relative",
    left: 20
  },
  userDetails: {
    paddingTop: "30px"
  },
  settingsNotification: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));
