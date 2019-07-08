import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import { NavBar, UserLogin } from '../components';
import { styles } from './styles';

export class PureProfile extends React.Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
            <NavBar />
            <div className = {classes.root}>
                <h1 align="middle" width="48" height="48"> Profile </h1>
                <UserLogin />
            </div>
        </div>
        );
    }
}

export const Profile = withStyles(styles)(PureProfile);
