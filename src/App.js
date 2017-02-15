import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  constructor() {
    super()
    this.state = { results: {}, resultsText: '' }
    this.handleAPICall = this.handleAPICall.bind(this)
  }
  handleAPICall(data, jsonString) {
    console.log(data, jsonString)
    this.setState({ results: data, resultsText: jsonString })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Find Your Representative</h2>
        </div>
        <div className="App-body">
          <Form onAPICall={this.handleAPICall}/>
          <pre>{this.state.resultsText}</pre>
        </div>
      </div>
    );
  }
}

export default App;
