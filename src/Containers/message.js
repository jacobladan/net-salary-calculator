import React from 'react';
import { DisclaimerMessage } from '../Components/disclaimer-message';
import { Link } from '../Components/link';

export class MessageContainer extends React.Component {
    render() {
        let style = 'hidden';                
        if (this.props.isVisible === true) {
            style = 'visible';                         
        } else {
            style = 'hidden';
        }
        return (
            <div className='message-container' style={{visibility: style}}>
                <DisclaimerMessage />
                <Link className='close-disclaimer' text="close" onClick={this.props.onClick}/>
            </div>
        );
    }
}