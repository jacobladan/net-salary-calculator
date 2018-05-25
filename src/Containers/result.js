import React from 'react';
import { Label } from '../Components/label';

export class ResultContainer extends React.Component {
    render() {
        return (
            <div className='result-container'>
                <Label label='Net Salary' class='net-salary-label'/>
                <p className='net-salary'>$0.00</p>
            </div>
        );
    }
}