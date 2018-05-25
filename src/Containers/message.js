import React from 'react';
import { DisclaimerMessage } from '../Components/disclaimer-message';
import { CloseMessage } from '../Components/close-message';

export class MessageContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "visible": true
        };
        this.toggleMessage = this.toggleMessage.bind(this);
    }

    componentClass = ["message-container"];

    toggleMessage() {
        if (this.state.visible === true) {
            this.componentClass.push("animated", "fadeOut");
        }
        this.setState({visible: !this.state.visible})
    }

    render() {
            return (
                <div className={this.componentClass.join(' ')}>
                    <DisclaimerMessage />
                    <CloseMessage onClick={this.toggleMessage}/>
                </div>
            );
    }
}