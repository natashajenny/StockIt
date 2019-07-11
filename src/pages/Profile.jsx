import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import { NavBar,  Login } from '../components';
import { styles } from './styles';

export class PureProfile extends React.Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
            <NavBar />
            <div className = {classes.root}>
                <Login />
            </div>
        </div>
        );
    }
}

export const Profile = withStyles(styles)(PureProfile);
