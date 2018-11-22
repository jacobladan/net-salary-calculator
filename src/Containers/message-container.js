import React from 'react';
import CloseIcon from '../images/close.svg';

export class MessageContainer extends React.Component {
    render() {
        return (
            <div className='message-container'>
                <h3>My Purpose</h3>
                <p className='disclaimer-message'>I calculate the approximate amount of your net annual salary after federal
                and provincial taxes are deducted. <br/> <br/><b>Note:</b> This does not include any additional deductions
                (eg. CPP, EI, etc.)</p>
                <div className="close-icon-container">
                    <img className="close-icon" src={CloseIcon} alt="close message" onClick={this.props.onClick} />
                </div>
            </div>
        );
    }
}
