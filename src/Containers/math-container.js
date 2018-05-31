import React from 'react';
import { CalculationMessage } from '../Components/calculation-message';
import CloseIcon from '../images/close.svg';

export class MathContainer extends React.Component {
    render() {
        return (
            <div className='math-container'>
                <CalculationMessage provinceRates={this.props.provinceRates}/>
                <img src={CloseIcon} alt="close" className='calculation-close-icon' onClick={this.props.onClick}/>
                </div>
            );
        }
}