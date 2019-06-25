import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { NavBar } from '../components';
import { styles } from './styles';

export class PureAboutUs extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar />
                <div className = {classes.root}>
                    <h1> About Us </h1>
                </div>
            </div>
        );  
    }
}

export const AboutUs = withStyles(styles)(PureAboutUs);
