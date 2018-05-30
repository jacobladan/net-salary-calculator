import React from 'react';

export class Select extends React.Component {
    
    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <select  className='province-select' onChange={(e) => this.handleChange(e)}>
                <option value="alberta">AB</option>
                <option value="british columbia">BC</option>
                <option value="manitoba">MB</option>
                <option value="new brunswick">NB</option>
                <option value="newfoundland and labrador">NL</option>
                <option value="nova scotia">NS</option>
                <option value="northwest territories">NT</option>
                <option value="nunavut">NU</option>
                <option value="ontario">ON</option>
                <option value="prince edward island">PE</option>
                <option value="quebec">QC</option>
                <option value="saskatchewan">SK</option>
                <option value="yukon">UT</option>
            </select>
        );
    }
}