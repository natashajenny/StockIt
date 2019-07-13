import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { PerformanceChart } from '../components';
import { styles } from './styles';

export class PureMetrics extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <NavBar /> */}
                <div className = {classes.root}>
                    <h1> Metrics </h1>
                    <PerformanceChart />
                </div>
            </div>
        );
    }
}

export const Metrics = withStyles(styles)(PureMetrics);
