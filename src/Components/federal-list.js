import React from 'react';

export class FederalList extends React.Component {

    render() {
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
}