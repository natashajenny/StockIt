import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { NavBar } from '../components';
import { styles } from './styles';

export class PureProfile extends React.Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
            <NavBar />
            <div className = {classes.root}>
                <h1> Profile </h1>
            </div>
        </div>
        );
    }
}

export const Profile = withStyles(styles)(PureProfile);
