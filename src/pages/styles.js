import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles(theme => ({
    root: {
        marginTop: theme.spacing(7.5),
        marginRight: theme.spacing(10),
        marginLeft: theme.spacing(10),
    },
    welcome: {
        textAlign: 'center',
        paddingBottom: '10vh',
        paddingTop: '15vh',
    },
    refreshButton: {
        marginLeft: '10px',
    },
    addStockButton: {
        marginLeft: 'auto',
        marginRight: '10px',
    },
    portfolioSubheading: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    home: {
        paddingTop: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userHome:{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    panel: {
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        width: '250px',
        padding: '40px',
    },
    title: {
        textAlign: 'center',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    homePaper: {
        margin: '10px',
    },
}));
