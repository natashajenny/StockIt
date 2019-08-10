import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        MaxHeight: 100,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 100,
    },
    image: {
        width: 50,
        height: 50,
    },
    img: {
        margin: 'auto',
    },
}));