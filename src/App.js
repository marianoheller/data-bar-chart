import React, { Component } from 'react';
import './App.css';

import BarChart from './BarChart/BarChart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BarChart data={[5,10,1,3]} size={[450,450]} />
      </div>
    );
  }
}

export default App;
