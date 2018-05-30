import React from 'react';
import { CalculationMessage } from '../Components/calculation-message';
import { Link } from '../Components/link';

export class MathContainer extends React.Component {
    render() {
        return (
            <div className='math-container'>
                <CalculationMessage />
                <Link className='close-calculation'  text="close" onClick={this.props.onClick}/>
            </div>
        );
    }
}