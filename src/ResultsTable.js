import React, { Component } from 'react'

import envelope from './svg/fa-envelope-o.svg'
import './ResultsTable.css'

function ResultRow (props) {
	const {
  		title,
		first_name,
		last_name,
		party,
		chamber,
		oc_email: email
	} = props.member;
	return (
		<tr key={props.key} style={{ textAlign: 'center'}}>
			<td>{title}. {first_name} {last_name}</td>
			<td className={party === 'D' ? 'text-blue' : party === 'R' ? 'text-red' : null}>{party}</td>
			<td>
				<a className="btn email" href={`mailto:${email}`}><img src={envelope} className="result-icon"/></a>
			</td>
		</tr>
	)
}

export default class ResultsTable extends Component {
	render() {
		const colCount = 5,
			  { data } = this.props
		if (data !== null) {
			const { reps, sens } = data,
				  repRow = reps.map( (rep,i) => {
					return <ResultRow member={rep} key={i}/>
				  }),
				  sensRow = sens.map( (sen,i) => {
				  	return <ResultRow member={sen} key={i}/>
				  });
			return (
				<table id="results-table">
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
}