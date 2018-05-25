import React from 'react';
import { DisclaimerMessage } from '../Components/disclaimer-message';

export class MessageContainer extends React.Component {
    render() {
        return (
            <div className='message-container'>
                <DisclaimerMessage />
            </div>
        );
    }
}