import React from 'react';

export class ProvinceList extends React.Component {

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });

    createList() {
        let amountValues = Object.values(this.props.provinceRates.amount);
        let percentValues = Object.values(this.props.provinceRates.percent).map((key) => {
            return (key * 100).toFixed(2);
        });

        let numValues = this.props.provinceRates.numValues;
        let n = 0;
        let list = [];

        for(let i = 0; i < numValues; i++) {
            if(amountValues[i] === 0) {break}
            if (n === 0) {
                list.push(<li key={i}><b>{percentValues[i]}% </b>is taken off the first <b>{this.formatter.format(amountValues[i])}</b></li>);
            } else if (n > 0 && n < (numValues - 1)) {
                list.push(<li key={i}><b>{percentValues[i]}% </b>is taken off the next <b>{this.formatter.format(amountValues[i])}</b></li>);
            } else {
                list.push(<li key={i}><b>{percentValues[i]}% </b>is taken off anything above <b>{this.formatter.format(amountValues[i])}</b></li>);
            }
            n++;  
        }
        return list;
    }

    render() {
            return <ul>{this.createList()}</ul>
    }
}