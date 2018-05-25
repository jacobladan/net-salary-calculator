import React from 'react';

export class TextInput extends React.Component {
    render() {
        return <input type="text" className='input' placeholder={this.props.placeholder}/>;
    }
}