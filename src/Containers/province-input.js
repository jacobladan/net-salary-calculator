import React from 'react';
import { Label } from '../Components/label';
import { Select } from '../Components/select';

export class ProvinceInputContainer extends React.Component {
    render() {
        return (
            <div className='input-container'>
                <Label label={this.props.label}/>
                <Select />
            </div> 
        )  
    }
}