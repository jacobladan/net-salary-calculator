import React from 'react';
import { Label } from '../Components/label';
import { Select } from '../Components/select';
import { TextInput } from '../Components/text-input';

export class InputContainer extends React.Component {
    render() {
        let element;
        if (this.props.type === 'select') {
            element = (
                <div className='input-container'>
                    <Label label={this.props.label}/>
                    <Select />
                </div>
            );
        } else {
            element = (
                <div className='input-container'>
                    <Label label={this.props.label}/>
                    <p className='dollar-sign'>$</p>
                    <TextInput placeholder='0.00'/>
                </div>
            );
        }
        return element;
    }
}