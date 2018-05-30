import React from 'react';

export class Button extends React.Component {
    render() {
        return <button className='button'>{this.props.text}</button>
    }
}