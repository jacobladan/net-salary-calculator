import React from 'react';
// Styles
import '../animate.css';
import '../styles.css';
// Containers
import { ProvinceInputContainer } from './province-input-container';
import { SalaryInputContainer } from './salary-input-container';
import { ResultContainer } from './result-container';
import { MessageContainer } from './message-container';
import { MathContainer } from './math-container';
// Components
import { Title } from '../Components/title';
import { Link } from '../Components/link';
import { ErrorMessage } from '../Components/error-message';
import { Animated } from "react-animated-css";

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
        this.toggleMessage = this.toggleMessage.bind(this);
        this.toggleMath = this.toggleMath.bind(this);
        this.setProvince = this.setProvince.bind(this);
        this.setSalary = this.setSalary.bind(this);
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
        console.log('Initial Salary: ' + this.state.initialSalary);
        console.log('Calculated Salary: ' + this.state.calculatedSalary);
        return (
            <div className='main-container'>
                <Title text='Salary Calculator'/>
                <Link className='link' text='What do I do?' onClick={this.toggleMessage}/>
                <ProvinceInputContainer label='Select your province' type='select' onChange={this.setProvince}/>
                <SalaryInputContainer label='Enter your annual salary' type='text' onChange={this.setSalary}/>
                <ErrorMessage />
                <ResultContainer salary={this.state.calculatedSalary}/>
                <Link className='link calculation' text='How I calculated this' class='calculation' onClick={this.toggleMath} />
                <Animated animationIn='fadeIn'  animationOut='fadeOut' isVisible={this.state.isMessageVisible} animateOnMount={false}>
                    <MessageContainer onClick={this.toggleMessage} />
                </Animated>
                <Animated animationIn='fadeIn' animationOut='fadeOut' isVisible={this.state.isMathVisible} animateOnMount={false}>
                    <MathContainer onClick={this.toggleMath} isVisible={this.state.isMathVisible} provinceRates={getProvincialRates(this.state.province)}/>
                </Animated>
            </div>
        );
    }
}

function calculateFederalDeduction(salary, country) {
    var federalDeduction = 0;
  
    try {
      var rates = getFederalRates(country);
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
      // console.log('federal deduction: ' + federalDeduction);
      return federalDeduction;
    }
  }
  
  function getFederalRates(country) {
  
    const FederalRatesList = {
      "canada": {
        "country": "Canada",
        "numValues": 5,
        "bracketOneAmt": 46605,
        "bracketTwoAmt": 46603,
        "bracketThreeAmt": 51281,
        "bracketFourAmt": 61353,
        "bracketFiveAmt": 205842,
        "bracketOnePercent": 0.15,
        "bracketTwoPercent": 0.205,
        "bracketThreePercent": 0.26,
        "bracketFourPercent": 0.29,
        "bracketFivePercent": 0.33,
      }
    };
  
    if(FederalRatesList[country]) {
      return FederalRatesList[country];
    } else {
      throw new Error(country + ' could not be found in the Federal Rates List.');
    }
  }
  
  function calculateProvinceDeduction(salary, province) {
    var provinceDeduction = 0;
  
    try {
      var rates = getProvincialRates(province);
      // console.log(rates);
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
  
  function getProvincialRates(province) {
  
    const ProvincialRatesList = {
      "ontario": {
        province: "Ontario",
        numValues: 5,
        amount: {
          bracketOneAmt: 42960,
          bracketTwoAmt: 42963,
          bracketThreeAmt: 64077,
          bracketFourAmt: 70000,
          bracketFiveAmt: 220000
        },
        percent: {
          bracketOnePercent: 0.0505,
          bracketTwoPercent: 0.0915,
          bracketThreePercent: 0.1116,
          bracketFourPercent: 0.1216,
          bracketFivePercent: 0.1316
        }
      },
      "manitoba": {
        province: "Manitoba",
        numValues: 3,
        amount: {
          bracketOneAmt: 31843,
          bracketTwoAmt: 42963,
          bracketThreeAmt: 68821
        },
        percent: {
          bracketOnePercent: 0.108,
          bracketTwoPercent: 0.1275,
          bracketThreePercent: 0.174
        }
      },
      "newfoundland and labrador": {
        province: "Newfoundland and Labrador",
        numValues: 5,
        amount: {
          bracketOneAmt: 36926,
          bracketTwoAmt: 36926,
          bracketThreeAmt: 57998,
          bracketFourAmt: 52740,
          bracketFiveAmt: 184590
        },
        percent: {
          bracketOnePercent: 0.087,
          bracketTwoPercent: 0.145,
          bracketThreePercent: 0.158,
          bracketFourPercent: 0.173,
          bracketFivePercent: 0.183
        }
      },
      "prince edward island": {
        province: "Prince Edward Island",
        numValues: 3,
        amount: {
          bracketOneAmt: 31984,
          bracketTwoAmt: 31985,
          bracketThreeAmt: 63969
        },
        percent: {
          bracketOnePercent: 0.098,
          bracketTwoPercent: 0.138,
          bracketThreePercent: 0.167
        }
      },
      "nova scotia": {
        province: "Nova Scotia",
        numValues: 5,
        amount: {
          bracketOneAmt: 29590,
          bracketTwoAmt: 29590,
          bracketThreeAmt: 33820,
          bracketFourAmt: 57000,
          bracketFiveAmt: 150000
        },
        percent: {
          bracketOnePercent: 0.0879,
          bracketTwoPercent: 0.1495,
          bracketThreePercent: 0.1667,
          bracketFourPercent: 0.175,
          bracketFivePercent: 0.21
        }
      },
      "new brunswick": {
        province: "New Brunswick",
        numValues: 5,
        amount: {
          bracketOneAmt: 41675,
          bracketTwoAmt: 41675,
          bracketThreeAmt: 52159,
          bracketFourAmt: 18872,
          bracketFiveAmt: 154382
        },
        percent: {
          bracketOnePercent: 0.0968,
          bracketTwoPercent: 0.1482,
          bracketThreePercent: 0.1652,
          bracketFourPercent: 0.1784,
          bracketFivePercent: 0.203
        }
      },
      "saskatchewan": {
        province: "Saskatchewan",
        numValues: 3,
        amount: {
          bracketOneAmt: 45225,
          bracketTwoAmt: 83989,
          bracketThreeAmt: 129214
        },
        percent: {
          bracketOnePercent: 0.105,
          bracketTwoPercent: 0.125,
          bracketThreePercent: 0.145
        }
      },
      "alberta": {
        province: "Alberta",
        numValues: 5,
        amount: {
          bracketOneAmt: 128145,
          bracketTwoAmt: 25628,
          bracketThreeAmt: 51258,
          bracketFourAmt: 102516,
          bracketFiveAmt: 307547
        },
        percent: {
          bracketOnePercent: 0.10,
          bracketTwoPercent: 0.12,
          bracketThreePercent: 0.13,
          bracketFourPercent: 0.14,
          bracketFivePercent: 0.15
        }
      },
      "british columbia": {
        province: "British Columbia",
        numValues: 6,
        amount: {
          bracketOneAmt: 39676,
          bracketTwoAmt: 39677,
          bracketThreeAmt: 11754,
          bracketFourAmt: 19523,
          bracketFiveAmt: 39370,
          bracketSixAmt: 150000,
        },
        percent: {
          bracketOnePercent: 0.0506,
          bracketTwoPercent: 0.077,
          bracketThreePercent: 0.105,
          bracketFourPercent: 0.1229,
          bracketFivePercent: 0.147,
          bracketSixPercent: 0.168,
        }
      },
      "yukon": {
        province: "Yukon",
        numValues: 5,
        amount: {
          bracketOneAmt: 46605,
          bracketTwoAmt: 46603,
          bracketThreeAmt: 51281,
          bracketFourAmt: 355511,
          bracketFiveAmt: 500000,
        },
        percent: {
          bracketOnePercent: 0.064,
          bracketTwoPercent: 0.09,
          bracketThreePercent: 0.109,
          bracketFourPercent: 0.128,
          bracketFivePercent: 0.15,
        }
      },
      "northwest territories": {
        province: "Northwest Territories",
        numValues: 4,
        amount: {
          bracketOneAmt: 42209,
          bracketTwoAmt: 42211,
          bracketThreeAmt: 52828,
          bracketFourAmt: 137248
        },
        percent: {
          bracketOnePercent: 0.059,
          bracketTwoPercent: 0.086,
          bracketThreePercent: 0.122,
          bracketFourPercent: 0.1405
        }
      },
      "nunavut": {
        province: "Nunavut",
        numValues: 4,
        amount: {
          bracketOneAmt: 44437,
          bracketTwoAmt: 44437,
          bracketThreeAmt: 55614,
          bracketFourAmt: 144488
        },
        percent: {
          bracketOnePercent: 0.04,
          bracketTwoPercent: 0.07,
          bracketThreePercent: 0.09,
          bracketFourPercent: 0.115
        }
      },
      "quebec": {
        province: "Quebec",
        numValues: 4,
        amount: {
          bracketOneAmt: 42705,
          bracketTwoAmt: 42700,
          bracketThreeAmt: 18510,
          bracketFourAmt: 103915
        },
        percent: {
          bracketOnePercent: 0.15,
          bracketTwoPercent: 0.20,
          bracketThreePercent: 0.24,
          bracketFourPercent: 0.2575
        }
      },
    };
  
    if(ProvincialRatesList[province]) {
      return ProvincialRatesList[province];
    } else {
      throw new Error(province + ' could not be found in Provincial Rates List');
    }
  }
  
  function lastBracketDeduction(salary, percentTax, prevBrackets) {
      return ((salary - prevBrackets) * percentTax);
  }