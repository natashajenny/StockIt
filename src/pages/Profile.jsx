import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import { NavBar,  Login, Register } from '../components';
import { styles } from './styles';

export class PureProfile extends React.Component {
 
    render() {
        const { classes } = this.props;
        return (
        <div>
            <NavBar />
            <div className = {classes.root}>
                <Login />
                <Register />
            </div>
        </div>
        );
    }
}

export const Profile = withStyles(styles)(PureProfile);
