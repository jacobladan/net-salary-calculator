import React from 'react';

export class Title extends React.Component {
    render() {
        return <h1>{this.props.text}</h1>;
    }
}