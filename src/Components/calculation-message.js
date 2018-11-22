import React from 'react';

export class CalculationMessage extends React.Component {
    render() {
        return (
            <div>
                <h3>The Math</h3>
                <h4>Federal</h4>
                <FederalList />
                <h4>Provincial ({this.props.provinceRates.province})</h4>
                <ProvinceList province={this.props.provinceRates.province} provinceRates={this.props.provinceRates}/>
            </div>
        );
    }
}

function FederalList() {
    return (
        <ul>
            <li><b>15%</b> is taken off the first <b>$46,605.00</b></li>
            <li><b>20.5%</b> is taken off the next <b>$46,603.00</b></li>
            <li><b>26%</b> is taken off the next <b>$51,281.00</b></li>
            <li><b>29%</b> is taken off the next <b>$61,353.00</b></li>
            <li><b>33%</b> is taken off anything above <b>$205,842.00</b></li>
        </ul>
    );
}

function ProvinceList(props) {
    let amountValues = Object.values(props.provinceRates.amount);
    let percentValues = Object.values(props.provinceRates.percent).map((key) => {
        return (key * 100).toFixed(2);
    });

    let numValues = props.provinceRates.numValues;
    let n = 0;
    let list = [];

    for(let i = 0; i < numValues; i++) {
        if(amountValues[i] === 0) {break}
        if (n === 0) {
            list.push(<li key={i}><b>{percentValues[i]}% </b>is taken off the first <b>{formatter.format(amountValues[i])}</b></li>);
        } else if (n > 0 && n < (numValues - 1)) {
            list.push(<li key={i}><b>{percentValues[i]}% </b>is taken off the next <b>{formatter.format(amountValues[i])}</b></li>);
        } else {
            list.push(<li key={i}><b>{percentValues[i]}% </b>is taken off anything above <b>{formatter.format(amountValues[i])}</b></li>);
        }
        n++;  
    }
    return <ul>{list}</ul>;
}

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
