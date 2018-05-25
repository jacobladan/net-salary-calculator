import React from 'react';
import { List } from '../Components/list';

export class ListContainer extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.zone}</h4>
                <List zone={this.props.zone}/>
            </div>
        );
    }
}