import React from 'react';
import { FederalListContainer } from '../Containers/federal-list-container';
import { ProvinceListContainer } from '../Containers/province-list-container';

export class CalculationMessage extends React.Component {
    render() {
        return (
            <div>
                <h3>The Math</h3>
                <FederalListContainer />
                <ProvinceListContainer province={this.props.provinceRates.province} provinceRates={this.props.provinceRates}/>
            </div>
        );
    }
}