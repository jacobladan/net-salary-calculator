import React from 'react';

export class Link extends React.Component {
    render() {
        return <p className={this.props.className} onClick={this.props.onClick}>{this.props.text}</p>;
    }
}