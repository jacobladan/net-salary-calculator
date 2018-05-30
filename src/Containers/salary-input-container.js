import React from 'react';
import { Label } from '../Components/label';
import { TextInput } from '../Components/text-input';

export class SalaryInputContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dollarSignColor: 'grey',
            inputHasVal: false
        }
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.hasVal = this.hasVal.bind(this);
    }

    handleFocus() {
        this.setState({dollarSignColor: 'black'});
    }
    
    handleBlur() {
        if (!this.state.inputHasVal) {
            this.setState({dollarSignColor: 'grey'});
        }
    }

    hasVal(inputHasVal) {
        this.setState({inputHasVal: inputHasVal});
    }

    render() {
        return (
            <div className='input-container'>
                <Label label={this.props.label}/>
                <p className='dollar-sign' style={{color: this.state.dollarSignColor}}>$</p>
                <TextInput placeholder='0.00' onFocus={this.handleFocus} onBlur={this.handleBlur} hasVal={this.hasVal} onChange={this.props.onChange}/>
            </div>
        )
    }
}