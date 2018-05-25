import React from 'react';
import { Link } from '../Components/link';
import { ListContainer } from '../Containers/list';

export class CalculationMessage extends React.Component {
    render() {
        return (
            <div>
                <h3>The Math</h3>
                <ListContainer zone='Federal'/>
                <ListContainer zone='Provincial'/>
                <Link text='close' class='close-calculation'/>
            </div>
        );
    }
}