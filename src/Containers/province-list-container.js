import React from 'react';
import { ProvinceList } from '../Components/province-list';

export class ProvinceListContainer extends React.Component {
    render() {
        return (
            <div>
                <h4>Provincial ({this.props.province})</h4>
                <ProvinceList provinceRates={this.props.provinceRates}/>
            </div>
        );
    }
}