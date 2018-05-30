import React from 'react';
import { Label } from '../Components/label';

export class ResultContainer extends React.Component {

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });

    render() {
        return (
            <div className='result-container'>
                <Label label='Net Salary' class='net-salary-label'/>
                <p className='net-salary'>{this.formatter.format(this.props.salary)}</p>
            </div>
        );
    }
}