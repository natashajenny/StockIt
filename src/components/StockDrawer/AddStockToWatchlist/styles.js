import { createStyles } from "@material-ui/core/styles";

const baseButton = {
  width: 160
};

export const styles = createStyles({
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "20px"
  },
  textField: {
    width: "100%",
    marginBottom: 16,
    flexDirection: "row"
  },
  submitButton: {
    ...baseButton,
    marginTop: 16,
    marginBottom: 8
  },
  submitText: {
    fontSize: 16
  },
  codeInput: {
    width: "83%",
    marginTop: 16,
    marginBottom: 16
  }
});
