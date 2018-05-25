import React from 'react';
import { CalculationMessage } from '../Components/calculation-message';

export class MathContainer extends React.Component {
    render() {
        return (
            <div className='math-container'>
                <CalculationMessage />
            </div>
        );
    }
}