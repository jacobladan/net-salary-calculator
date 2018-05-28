import React from 'react';
import { CalculationMessage } from '../Components/calculation-message';
import { Link } from '../Components/link';

export class MathContainer extends React.Component {
    render() {
        let style = 'hidden';                
        if (this.props.isVisible === true) {
            style = 'visible';                         
        } else {
            style = 'hidden';
        }
        return (
            <div className='math-container' style={{visibility: style}}>
                <CalculationMessage />
                <Link className='close-calculation'  text="close" onClick={this.props.onClick}/>
            </div>
        );
    }
}