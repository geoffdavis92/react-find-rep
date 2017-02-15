import React, { Component } from 'react'
import AJAX from 'ajax.js'

import states from './data.js'
import './Form.css'

export class FormGroup extends Component {
	render() {
		return <div className="form-group">{this.props.children}</div>
	}
}

export default class Form extends Component {
	constructor() {
		super()
		this.state = { fieldHasValue: false }
		this.handleFormSubmission = this.handleFormSubmission.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleBlur(e) {
		const { value, id } = e.target
		console.log(value)
		if (value) {
			this.setState({
				[`${id}HasValue`]: true
			})
		} else if (this.state[`${id}HasValue`]) {
			this.setState({
				[`${id}HasValue`]: false
			})
		}
	}
	handleFormSubmission(e) {
		e.preventDefault();
	}
	render() {
		const stateOptions = states.map( state => {
			const { stateName, abbv } = state;
			return <option value={{stateName, abbv}}>{state.abbv}</option>
		})
		return(
			<form id="react-fyr-form" onSubmit={this.handleFormSubmission}>
				<FormGroup>
					<select name="state" id="state" required className={this.state.stateHasValue ? 'field-has-value' : null} onBlur={this.handleBlur}>
						<optgroup label="Select State...">
							{stateOptions}
						</optgroup>
					</select>
					<label htmlFor="state" className="field-label">Enter State</label>
					<label htmlFor="state" className="icon-dropdown">&#10095;</label>
				</FormGroup>
				<FormGroup>
					<select name="queryType" id="queryType" required className={this.state.queryTypeHasValue ? 'field-has-value' : null} onBlur={this.handleBlur}>
						<optgroup label="Select...">
							<option value="reps">Reps.</option>
							<option value="sens">Senators</option>
							<option value="both">Both</option>
						</optgroup>
					</select>
					<label htmlFor="queryType" className="field-label">Find me&hellip;</label>
					<label htmlFor="queryType" className="icon-dropdown">&#10095;</label>
				</FormGroup>
				<FormGroup>
					<input type="submit" value="Go&nbsp;&#10095;" onClick={this.handleFormSubmission}/>
				</FormGroup>
			</form>
		)
	}
}

//<input type="text" name="state" id="state" required className={this.state.stateHasValue ? 'field-has-value' : null} onBlur={this.handleBlur}/>