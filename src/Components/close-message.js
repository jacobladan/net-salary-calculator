import React from 'react';

export class CloseMessage extends React.Component {
    render() {
        return <p className="close-disclaimer" onClick={this.props.onClick}>close</p>
    }
}