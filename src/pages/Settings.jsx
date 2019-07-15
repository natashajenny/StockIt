import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// import { NavBar } from '../components';
import { styles } from './styles';

export class PureSettings extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> Settings </h1>
            </div>
        );  
    }
}

export const Settings = withStyles(styles)(PureSettings);
