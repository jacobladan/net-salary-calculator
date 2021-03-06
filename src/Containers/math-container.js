import React from 'react';
import { CalculationMessage } from '../Components/calculation-message';
import CloseIcon from '../images/close.svg';

export class MathContainer extends React.Component {
    render() {
        return (
            <div className='math-container'>
                <CalculationMessage provinceRates={this.props.provinceRates}/>
                <div className="close-icon-container">
                    <img className="close-icon" src={CloseIcon} alt="close message" onClick={this.props.onClick} />
                </div>
                </div>
            );
        }
}