import React from 'react';

import { NavBar } from '../components';
import { SimpleTable } from '../components/Table/Table.jsx';


export class Metrics extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <h1> Metrics  </h1>
                <SimpleTable />
            </div>
        );
    }
}
