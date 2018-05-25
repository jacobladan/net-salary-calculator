import React from 'react';
import { CalculationMessage } from '../Components/calculation-message';
import { CloseCalculation } from '../Components/close-calculation';

export class MathContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "visible": true
        };
        this.toggleMessage = this.toggleMessage.bind(this);
    }

    componentClass = ["math-container"];

    toggleMessage() {
        if (this.state.visible === true) {
            this.componentClass.push("animated", "fadeOut");
        }
        this.setState({visible: !this.state.visible})
    }

    render() {
            return (
                <div className={this.componentClass.join(' ')}>
                    <CalculationMessage />
                    <CloseCalculation onClick={this.toggleMessage}/>
                </div>
            );
    }
}