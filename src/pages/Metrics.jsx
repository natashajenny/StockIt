import React from 'react';

import { NavBar, PerformanceChart } from '../components';

export class Metrics extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <h1> Metrics </h1>
                <PerformanceChart />
            </div>
        );
    }
}
