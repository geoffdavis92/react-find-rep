import React, { Component } from 'react'

import { externalLink } from './utilities'

import './ResultsTable.css'

function ResultRow (props) {
	const {
  		title,
		first_name,
		last_name,
		party,
		chamber,
		website,
		facebook_id: facebook,
		twitter_id: twitter
	} = props.member;
	return (
		<tr key={props._key} style={{ textAlign: 'center'}}>
			<td>{title}. {first_name} {last_name}</td>
			<td className={party === 'D' ? 'text-blue' : party === 'R' ? 'text-red' : null}>{party}</td>
			<td>
				{facebook && <a className="btn fb" href={`https://facebook.com/${facebook}`} {...externalLink()}><i className="fa fa-facebook"/></a>}
				{twitter && <a className="btn tw" href={`https://twitter.com/${twitter}`} {...externalLink()}><i className="fa fa-twitter"/></a>}
				{website && <a className="btn web" href={`${website}`} {...externalLink()}><i className="fa fa-id-card-o"/></a>}
			</td>
		</tr>
	)
} //<a className="btn email" href={`mailto:${email}`}><i className="fa fa-envelope-o"/></a>

export default class ResultsTable extends Component {
	render() {
		const colCount = 5,
			  { data } = this.props,
			  dataHasEntries = data !== null && (data.reps.length > 0 || data.sens.length > 0)
		if (data !== null && dataHasEntries) {
			const { reps, sens } = data,
				  repRow = reps.map( (rep,i) => {
				  	data['thisDistrict'] = rep.district
				  	data['thisState'] = rep.state_name
					return <ResultRow member={rep} key={i} _key={i}/>
				  }),
				  sensRow = sens.map( (sen,i) => {
				  	return <ResultRow member={sen} key={i} _key={i}/>
				  });
			return (
				<table id="results-table">
					<tbody>
						<tr>
							<th colSpan={colCount}>District {data.thisDistrict} Representative</th>
						</tr>
						<tr>
							<th>Member</th>
							<th>Party</th>
							<th>Contact</th>
						</tr>
						{repRow}
						<tr>
							<th colSpan={colCount}>{data.thisState} Senators</th>
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
		} else if (data !== null && !dataHasEntries) {
			return <table className={`no-results searched`} id="results-table"><tbody><tr><td>No results</td></tr></tbody></table>
		} else {
			return <table className={`no-results`} id="results-table"><tbody><tr><td>Search for Congressmembers using the form above.</td></tr></tbody></table>
		}
	}
}