import React from 'react';

export class CloseCalculation extends React.Component {
    render() {
        return <p className="close-disclaimer" onClick={this.props.onClick}>close</p>
    }
}