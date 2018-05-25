import React from 'react';

export class List extends React.Component {

    render() {
        let element;
        if (this.props.zone === 'Federal') {
            element = (
                <ul id="federal-list">
                    <li><b>15%</b> is taken off the first <b>$46,605.00</b></li>
                    <li><b>20.5%</b> is taken off the next <b>$46,603.00</b></li>
                    <li><b>26%</b> is taken off the next <b>$51,281.00</b></li>
                    <li><b>29%</b> is taken off the next <b>$61,353.00</b></li>
                    <li><b>33%</b> is taken off anything above <b>$205,842.00</b></li>
                </ul>
            );
        } else if (this.props.zone === 'Provincial') {
            element = (
                <ul id="provincial-list">
                    <li><b>5.05%</b> is taken off the first <b>$42,960.00</b></li>
                    <li><b>9.15%</b> is taken off the next <b>$42,963.00</b></li>
                    <li><b>11.16%</b> is taken off the next <b>$64,077.00</b></li>
                    <li><b>12.16%</b> is taken off the next <b>$70,000.00</b></li>
                    <li><b>13.16%</b> is taken off anything above <b>$220,000.00</b></li>
                </ul>
            );
        }
        return element;
    }
}