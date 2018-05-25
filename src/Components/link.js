import React from 'react';

export class Link extends React.Component {



    render() {
        let className;
        if (this.props.class === 'calculation') {
            className = 'link calculation';
        } else if (this.props.class === 'close-disclaimer') {
            className = 'close-disclaimer';
        } else if (this.props.class === 'close-calculation') {
            className = 'close-calculation';
        } else {
            className = 'link'
        }
        return <p className={className} onClick={this.props.toggleMessage}>{this.props.text}</p>;
    }
}