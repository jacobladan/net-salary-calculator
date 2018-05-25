import React from 'react';
// import $ from 'jquery'; 
import '../styles.css';
import { InputContainer } from './input';
import { Title } from '../Components/title';
import { Link } from '../Components/link';
import { Button } from '../Components/button';
import { ErrorMessage } from '../Components/error-message';
import { ResultContainer } from './result';
import { MessageContainer } from './message';
import { MathContainer } from './math';

export class Tile extends React.Component {
    render() {
        return (
            <div className='main-container'>
                <Title text='Salary Calculator'/>
                <Link text='What do I do?'/>
                <MessageContainer />
                <InputContainer label='Select your province' type='select'/>
                <InputContainer label='Enter your annual salary' type='text'/>
                <ErrorMessage />
                <Button text='Calculate'/>
                <ResultContainer />
                <Link text='How I calculated this' class='calculation'/>
                <MathContainer />
            </div>
        );
    }
}