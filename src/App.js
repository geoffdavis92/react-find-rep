import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import { endpoints, sampleResponseText } from './data'

const { repLinks } = endpoints

class App extends Component {
  constructor() {
    super()
    this.state = { results: {}, resultsText: sampleResponseText }
    this.handleAPICall = this.handleAPICall.bind(this)
  }
  handleAPICall(data, jsonString) {
    console.log(data, jsonString) 

    data.forEach( (rep,i,repList) => {
      const { 
              title,
              first_name,
              last_name,
              gender,
              birthday,
              state,
              state_name,
              district,
              chamber,
              party,
              website,
              contact_form,
              oc_email,
              govtrack_id,
              facebook_id,
              twitter_id,
              youtube_id
            } = rep;
      console.log({title, first_name, last_name})
    })

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
          <pre style={{fontSize: '12px'}}>{this.state.resultsText}</pre>
        </div>
      </div>
    );
  }
}

export default App;
