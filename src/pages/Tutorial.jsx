import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {newsGrid} from '../components/NewsGrid/NewsGrid';

import { styles } from './styles';

export class PureTutorial extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> Tutorial </h1>
                {newsGrid()}
            </div>
        );  
    }
}

export const Tutorial = withStyles(styles)(PureTutorial);
