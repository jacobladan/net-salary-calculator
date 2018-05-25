import React from 'react';

export class Label extends React.Component {
    render() {
        let className;
        if (this.props.class === 'net-salary-label') {
            className = 'net-salary-label';
        } else {
            className = 'label';
        }
        return <label className={className}>{this.props.label}</label>
    }
}