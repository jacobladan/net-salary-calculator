import React from 'react';
import { ListContainer } from '../Containers/list-container';

export class CalculationMessage extends React.Component {
    render() {
        return (
            <div>
                <h3>The Math</h3>
                <ListContainer zone='Federal'/>
                <ListContainer zone='Provincial' provinceRates={this.props.provinceRates}/>
            </div>
        );
    }
}