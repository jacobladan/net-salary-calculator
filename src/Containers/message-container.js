import React from 'react';
import { DisclaimerMessage } from '../Components/disclaimer-message';
import CloseIcon from '../images/close.svg';

export class MessageContainer extends React.Component {
    render() {
        return (
            <div className='message-container'>
                <DisclaimerMessage />
                <img src={CloseIcon} alt="close" className='disclaimer-close-icon' onClick={this.props.onClick}/>
                </div>
            );
        }
}