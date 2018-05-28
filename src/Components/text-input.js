import React from 'react';

export class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        };
    }

    format(e) {
        let value = parseInt(e.target.value.replace(/\D/g,''),10);
        if (!isNaN(value)) {
            this.setState({inputVal: value.toLocaleString()});
            this.props.hasVal(true);
        } else {
            this.setState({inputVal: ""})
            this.props.hasVal(false);
        }
    }

    render() {
        return <input 
                    maxLength="13"
                    type="text" 
                    className='input' 
                    placeholder={this.props.placeholder} 
                    onFocus={this.props.onFocus} 
                    onBlur={this.props.onBlur}
                    onChange={(e) => this.format(e)}
                    value={this.state.inputVal}
                />;
    }
}