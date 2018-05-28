import React from 'react';
import '../animate.css';
import '../styles.css';
import { InputContainer } from './input';
import { Title } from '../Components/title';
import { Link } from '../Components/link';
import { Button } from '../Components/button';
import { ErrorMessage } from '../Components/error-message';
import { ResultContainer } from './result';
import { MessageContainer } from './message';
import { MathContainer } from './math';
import { Animated } from "react-animated-css";

export class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'isMessageVisible': false,
            'isMathVisible': false
        };
        this.toggleMessage = this.toggleMessage.bind(this);
        this.toggleMath = this.toggleMath.bind(this);
    }

    toggleMessage() {
        this.setState({'isMessageVisible': !this.state.isMessageVisible});                
    }

    toggleMath() {
        this.setState({'isMathVisible': !this.state.isMathVisible});
    }

    render() {
        return (
            <div className='main-container'>
                <Title text='Salary Calculator'/>
                <Link className='link' text='What do I do?' onClick={this.toggleMessage}/>
                <Animated animationIn='fadeIn'  animationOut='fadeOut' isVisible={this.state.isMessageVisible} animateOnMount={false}>
                    <MessageContainer onClick={this.toggleMessage} />
                </Animated>
                <InputContainer label='Select your province' type='select'/>
                <InputContainer label='Enter your annual salary' type='text'/>
                <ErrorMessage />
                <Button text='Calculate'/>
                <ResultContainer />
                <Link className='link calculation' text='How I calculated this' class='calculation' onClick={this.toggleMath} />
                <Animated animationIn='fadeIn' animationOut='fadeOut' isVisible={this.state.isMathVisible} animateOnMount={false}>
                    <MathContainer onClick={this.toggleMath} isVisible={this.state.isMathVisible}/>
                </Animated>
            </div>
        );
    }
}