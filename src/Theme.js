import { createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import red from 'material-ui/colors/red';

export default createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo // Indigo is probably a good match with pink
  }
});
