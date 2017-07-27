import React, { Component } from 'react';
import './App.css';

import BarChart from './BarChart/BarChart'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="App">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
