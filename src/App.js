import React, { Component } from 'react';
import { Tile } from './Containers/tile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tile />
        <div className="github-text">
          Check out the code <a className="github-link" target="_blank" href="https://github.com/jacobladan/net-salary-calculator" rel="noopener noreferrer">here</a>
        </div>
      </div>
    );
  }
}

export default App;
