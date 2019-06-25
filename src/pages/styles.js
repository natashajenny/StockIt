import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles(theme => ({
    root: {
        marginTop: theme.spacing(7.5),
        marginRight: theme.spacing(10),
        marginLeft: theme.spacing(10),
    },
    newPortfolioButton: {
        align: 'right',
    },
    portfolioSubheading: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
