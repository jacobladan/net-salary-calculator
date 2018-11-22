import React from 'react';
// Styles
import '../styles/animate.css';
import '../styles/styles.css';
import '../styles/responsive-styles.css';
// Containers
import { ProvinceInputContainer } from './province-input-container';
import { SalaryInputContainer } from './salary-input-container';
import { ResultContainer } from './result-container';
import { MessageContainer } from './message-container';
import { MathContainer } from './math-container';
// Components
import { Title } from '../Components/title';
import { Link } from '../Components/link';
import { Animated } from "react-animated-css";
// APIs
import * as federalRates from '../api/federal-rates.json';
import * as provincialRates from '../api/province-rates.json';


export class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'isMessageVisible': false,
            'isMathVisible': false,
            'initialSalary': 0,
            'province': 'alberta',
            'country': 'canada',
            'calculatedSalary': 0
        };
    }

    toggleMessage() {
        this.setState({'isMessageVisible': !this.state.isMessageVisible});                
    }

    toggleMath() {
        this.setState({'isMathVisible': !this.state.isMathVisible});
    }

    setProvince(province) {
        this.setState({'province': province});
        this.calculateNetSalary(this.state.initialSalary, province);
    }

    setSalary(salary) {
        this.setState({'initialSalary': salary});
        this.calculateNetSalary(salary, this.state.province);
    }

    calculateNetSalary(salary, province) { 
        let federalDeduction = calculateFederalDeduction(salary, this.state.country);
        let provinceDeduction =  calculateProvinceDeduction(salary, province);
        let calculatedSalary = salary - federalDeduction - provinceDeduction;
        this.setState({'calculatedSalary': calculatedSalary});
    }
    
    render() {
        return (
            <div className='main-container'>
                <Title text='Salary Calculator'/>
                <Link className='link' text='What do I do?' onClick={() => this.toggleMessage()}/>
                <ProvinceInputContainer onChange={(province) => this.setProvince(province)}/>
                <SalaryInputContainer onChange={(salary) => this.setSalary(salary)}/>
                <ResultContainer salary={this.state.calculatedSalary}/>
                <Link className='link calculation' text='How I calculated this' class='calculation' onClick={() => this.toggleMath()} />
                <Animated animationIn='fadeIn'  animationOut='fadeOut' isVisible={this.state.isMessageVisible} animateOnMount={false}>
                    <MessageContainer onClick={() => this.toggleMessage()} />
                </Animated>
                <Animated animationIn='fadeIn' animationOut='fadeOut' isVisible={this.state.isMathVisible} animateOnMount={false}>
                    <MathContainer onClick={() => this.toggleMath()} isVisible={this.state.isMathVisible} provinceRates={provincialRates[this.state.province]}/>
                </Animated>
            </div>
        );
    }
}

function calculateFederalDeduction(salary, country) {
    var federalDeduction = 0;
    try {
      var rates = federalRates[country];
      var bracketTwoTotal = rates.bracketOneAmt + rates.bracketTwoAmt;
      var bracketThreeTotal = bracketTwoTotal + rates.bracketThreeAmt;
      var bracketFourTotal = bracketThreeTotal + rates.bracketFourAmt;
      var bracketFiveTotal = bracketFourTotal + rates.bracketFiveAmt;
  
      var maxBracketOne = rates.bracketOneAmt * rates.bracketOnePercent;
      var maxBracketTwo = rates.bracketTwoAmt * rates.bracketTwoPercent;
      var maxBracketThree = rates.bracketThreeAmt * rates.bracketThreePercent;
      var maxBracketFour = rates.bracketFourAmt * rates.bracketFourPercent;
      var maxBracketFive = rates.bracketFiveAmt * rates.bracketFivePercent;
  
      if (salary < rates.bracketOneAmt) {
        federalDeduction = lastBracketDeduction(salary, rates.bracketOnePercent, 0);
      } else if (salary < bracketTwoTotal || rates.numValues === 2) {
        federalDeduction = lastBracketDeduction(salary, rates.bracketTwoPercent, rates.bracketOneAmt) + maxBracketOne;
      } else if (salary < bracketThreeTotal || rates.numValues === 3) {
        federalDeduction = lastBracketDeduction(salary, rates.bracketThreePercent, bracketTwoTotal) + maxBracketOne + maxBracketTwo;
      } else if (salary < bracketFourTotal || rates.numValues === 4) {
        federalDeduction = lastBracketDeduction(salary, rates.bracketFourPercent, bracketThreeTotal) + maxBracketOne + maxBracketTwo + maxBracketThree;
      } else if (salary < bracketFiveTotal || rates.numValues === 5) {
        federalDeduction = lastBracketDeduction(salary, rates.bracketFivePercent, bracketFourTotal) + maxBracketOne + maxBracketTwo + maxBracketThree + maxBracketFour;
      } else {
        federalDeduction = lastBracketDeduction(salary, rates.bracketSixPercent, bracketFiveTotal) + maxBracketOne + maxBracketTwo + maxBracketThree + maxBracketFour + maxBracketFive;
      }
    } catch(e) {
      console.error(e);
    } finally {
      return federalDeduction;
    }
  }
  
  function calculateProvinceDeduction(salary, province) {
    var provinceDeduction = 0;
  
    try {
      var rates = provincialRates[province];
      var bracketTwoTotal = rates.amount.bracketOneAmt + rates.amount.bracketTwoAmt;
      var bracketThreeTotal = bracketTwoTotal + rates.amount.bracketThreeAmt;
      var bracketFourTotal = bracketThreeTotal + rates.amount.bracketFourAmt;
      var bracketFiveTotal = bracketFourTotal + rates.amount.bracketFiveAmt;
  
      var maxBracketOne = rates.amount.bracketOneAmt * rates.percent.bracketOnePercent;
      var maxBracketTwo = rates.amount.bracketTwoAmt * rates.percent.bracketTwoPercent;
      var maxBracketThree = rates.amount.bracketThreeAmt * rates.percent.bracketThreePercent;
      var maxBracketFour = rates.amount.bracketFourAmt * rates.percent.bracketFourPercent;
      var maxBracketFive = rates.amount.bracketFiveAmt * rates.percent.bracketFivePercent;
  
      if (salary < rates.amount.bracketOneAmt) {
        provinceDeduction = lastBracketDeduction(salary, rates.percent.bracketOnePercent, 0);
      } else if (salary < bracketTwoTotal || rates.numValues === 2) {
        provinceDeduction = lastBracketDeduction(salary, rates.percent.bracketTwoPercent, rates.amount.bracketOneAmt) + maxBracketOne;
      } else if (salary < bracketThreeTotal || rates.numValues === 3) {
        provinceDeduction = lastBracketDeduction(salary, rates.percent.bracketThreePercent, bracketTwoTotal) + maxBracketOne + maxBracketTwo;
      } else if (salary < bracketFourTotal || rates.numValues === 4) {
        provinceDeduction = lastBracketDeduction(salary, rates.percent.bracketFourPercent, bracketThreeTotal) + maxBracketOne + maxBracketTwo + maxBracketThree;
      } else if (salary < bracketFiveTotal || rates.numValues === 5) {
        provinceDeduction = lastBracketDeduction(salary, rates.percent.bracketFivePercent, bracketFourTotal) + maxBracketOne + maxBracketTwo + maxBracketThree + maxBracketFour;
      } else {
        provinceDeduction = lastBracketDeduction(salary, rates.percent.bracketSixPercent, bracketFiveTotal) + maxBracketOne + maxBracketTwo + maxBracketThree + maxBracketFour + maxBracketFive;
      }
    } catch(e) {
      console.error(e);
    } finally {
      return provinceDeduction;
    }
  }
  
    function lastBracketDeduction(salary, percentTax, prevBrackets) {
      return ((salary - prevBrackets) * percentTax);
  }