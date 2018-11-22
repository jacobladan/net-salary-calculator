import React from 'react';

export class Label extends React.Component {
    render() {
        return <label className={this.props.class}>{this.props.label}</label>
    }
}