import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import ResultsTable from './ResultsTable.js';
import { endpoints, sampleResponse, sampleResponseText } from './data'

const { repLinks } = endpoints

class App extends Component {
	constructor() {
		super()
		this.state = { displayResults: null, results: sampleResponse }
		this.handleAPICall = this.handleAPICall.bind(this)
		this.constructResultsTable = this.constructResultsTable.bind(this)
	}
	handleAPICall(data) {
		const { results, queryType } = data
		const sens = [],
			  reps = [];
		results.forEach( (rep,i,repList) => {
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
			switch (queryType) {
				case 'reps':
				break;
				case 'sens':
				break;
				default:
					// case === both
					if (title === 'Sen') {
						// Senator -> sens[]
						sens.push({
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
						})
					} else {
						// Representative -> reps[]
						reps.push({
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
						})
					}
				break;
			}
		})

		const updatedDisplayResults = { reps, sens };
		if (updatedDisplayResults !== this.state.displayResults) {
			console.log('set App.state.displayResults')
			this.setState({ displayResults: updatedDisplayResults });
		}
	}
	constructResultsTable(data) {
		console.log(`construct results table`,data)
		const { reps, sens } = data,
			  repRow = reps.map( (rep,i) => {
			  	const { title, first_name, last_name } = rep
				return (
					<tr key={i}>
						<td>{title}. {first_name} {last_name}</td>
					</tr>
				)
			  })
	}
	render() {
		return (
			<div className="App">
				<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"/>
				<div className="App-header">
				<h2>Find Your Representative</h2>
				</div>
				<div className="App-body">
					<Form onAPICall={this.handleAPICall}/>
					<ResultsTable data={this.state.displayResults}/>
				</div>
			</div>
		);
	}
}

export default App;
