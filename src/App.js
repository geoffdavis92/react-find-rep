import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  constructor() {
    super()
    this.state = { results:{} }
    this.handleAPICall = this.handleAPICall.bind(this)
  }
  handleAPICall(apiData) {
    console.log(apiData)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Find Your Representative</h2>
        </div>
        <div className="App-body">
          <Form onAPICall={this.handleAPICall}/>
        </div>
        {/*<p className="App-intro"></p>*/}
      </div>
    );
  }
}

export default App;
