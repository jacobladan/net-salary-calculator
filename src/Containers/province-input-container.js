import React from 'react';
import { Label } from '../Components/label';
import { Select } from '../Components/select';

export class ProvinceInputContainer extends React.Component {
    render() {
        return (
            <div className='input-container'>
                <Label label="Select your province" class="label"/>
                <Select onChange={this.props.onChange}/>
            </div> 
        )  
    }
}
