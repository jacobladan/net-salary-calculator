import React from 'react';
import { DisclaimerMessage } from '../Components/disclaimer-message';
import { Link } from '../Components/link';

export class MessageContainer extends React.Component {
    render() {
        return (
            <div className='message-container'>
                <DisclaimerMessage />
                <Link className='close-disclaimer' text="close" onClick={this.props.onClick}/>
            </div>
        );
    }
}