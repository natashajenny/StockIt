import React from 'react';

import { NavBar } from '../components';
import { Table } from '../components';


export class Metrics extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <h1> Metrics  </h1>
                <Table />
            </div>
        );
    }
}
