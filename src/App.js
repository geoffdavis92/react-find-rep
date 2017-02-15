import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Find Your Representative</h2>
        </div>
        <div className="App-body">
          <Form/>
        </div>
        {/*<p className="App-intro"></p>*/}
      </div>
    );
  }
}

export default App;
