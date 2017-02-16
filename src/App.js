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
	componentDidMount() {
		// Ignore for port
		const queryType = 'both'
		// END Ignore
		const sens = [],
			  reps = [];
		this.state.results.forEach( (rep,i,repList) => {
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
	handleAPICall(data) {
		const { results, queryType } = data
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
			console.log({title, first_name, last_name})
		})

		this.setState({ results })
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
		const resultsTable = () => {
			const colCount = 5
			if (this.state.displayResults !== null) {
				const { reps, sens } = this.state.displayResults,
					  repRow = reps.map( (rep,i) => {
					  	const {
					  		title,
							first_name,
							last_name,
							party,
							chamber,
							oc_email: email
						} = rep;
						return (
							<tr key={i} style={{ textAlign: 'center'}}>
								<td>{title}. {first_name} {last_name}</td>
								<td>{party}</td>
								<td>
									<a className="btn" href={`mailto:${email}`}>Email</a>
								</td>
							</tr>
						)
					  }),
					  sensRow = sens.map( (sen,i) => {
					  	const {
					  		title,
							first_name,
							last_name,
							party,
							chamber,
							oc_email: email
						} = sen;
						return (
							<tr key={i} style={{ textAlign: 'center'}}>
								<td>{title}. {first_name} {last_name}</td>
								<td>{party}</td>
								<td>
									<a className="btn" href={`mailto:${email}`}>Email</a>
								</td>
							</tr>
						)
					  });
				return (
					<table>
						<tbody>
							<tr>
								<th colSpan={colCount}>Representative</th>
							</tr>
							<tr>
								<th>Member</th>
								<th>Party</th>
								<th>Contact</th>
							</tr>
							{repRow}
							<tr>
								<th colSpan={colCount}>Senators</th>
							</tr>
							<tr>
								<th>Member</th>
								<th>Party</th>
								<th>Contact</th>
							</tr>
							{sensRow}
						</tbody>
					</table>
				)
			} else {
				return <p>No results</p>
			}
		}
		return (
			<div className="App">
				<div className="App-header">
				<h2>Find Your Representative</h2>
				</div>
				<div className="App-body">
					<Form onAPICall={this.handleAPICall}/>
					<ResultsTable data={this.state.displayResults}/>
					<pre style={{fontSize: '12px'}}>{this.state.resultsText}</pre>
				</div>
			</div>
		);
	}
}

export default App;
