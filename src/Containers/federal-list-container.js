import React from 'react';
import { FederalList } from '../Components/federal-list';

export class FederalListContainer extends React.Component {
    render() {
        return (
            <div>
                <h4>Federal</h4>
                <FederalList />
            </div>
        );
    }
}