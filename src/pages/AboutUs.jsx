import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { styles } from './styles';

export class PureAboutUs extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> About Us </h1>
                <Typography variant="body1"> We are a group of UNSW Students in their penultimate and last year. The group includes:</Typography>
                <li> Alina Young </li>
                <li> Ian Ethan Wong </li>
                <li> Natasha Jenny </li>
                <li> Yaroslav AKimov </li>
            </div>
        );  
    }
}

export const AboutUs = withStyles(styles)(PureAboutUs);
