import React from 'react';

export class DisclaimerMessage extends React.Component {

    render() {
        return (
            <div>
                <h3>My Purpose</h3>
                <p className='disclaimer-message'>I calculate the approximate amount of your net annual salary after federal
                and provincial taxes are deducted. <br/> <br/>Note: This does not include any additional deductions
                (eg. CPP, EI, etc.)</p>
            </div>
        );
    }
}