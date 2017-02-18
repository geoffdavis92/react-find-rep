import React, { Component } from 'react'
import AJAX from 'ajax.js'

import states, { endpoints } from './data.js'
import { scrapeForm } from './utilities'

import './Form.css'

const { get } = AJAX;

export class FormGroup extends Component {
	render() {
		return <div className="form-group">{this.props.children}</div>
	}
}

export default class Form extends Component {
	constructor() {
		super()
		this.state = { 
			zipHasValue: false, 
			queryTypeHasValue: false, 
			zipIsValid: false, 
			queryTypeIsValid: false,
			formIsValid: false,
			selectedZip: null,
			selectedQueryType: null,
			errors: []
		}
		this.handleFormSubmission = this.handleFormSubmission.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleInput(e) {
		const { value, id } = e.target
		// Check if input has value
		if (value !== '' && id && value !== 'Select...') {
			this.setState({
				[`${id}HasValue`]: true
			})
		// eslint-disable-next-line
		} else if (value === '' || value === 'Select...' && this.state[`${id}HasValue`]) {
			this.setState({
				formIsValid: false,
				[`${id}HasValue`]: false
			})
		}
		// Check if value is valid
		switch (id) {
			case 'zip':
				const pattern = new RegExp(/^[0-9]{5}$/)
				if (pattern.test(value)) {
					this.setState({
						formIsValid: (true && this.state.queryTypeIsValid),
						[`zipIsValid`]: true,
						[`selectedZip`]: value
					})
				} else {
					this.setState({
						formIsValid: false,
						[`zipIsValid`]: false,
						[`selectedZip`]: null
					})
				}
			break;
			case ('queryType'):
				if (value === 'Select...') {
					this.setState({
						formIsValid: false,
						[`${id}IsValid`]: false
					})
				} else {
					this.setState({
						formIsValid: (true && this.state.zipIsValid),
						[`queryTypeIsValid`]: true,
						[`selectedQueryType`]: value
					})
				}
			break;
			default:
			break;
		}
	}
	handleBlur(e) {}
	handleFormSubmission(e) {
		e.preventDefault();
		// eslint-disable-next-line
		const onAPICall = this.props.onAPICall,
			  { sunlightZIPSearch } = endpoints,
			  { zip, queryType } = scrapeForm(this.Form);
		get(`${sunlightZIPSearch}${zip}`,null,response => {
			const { results } = response
			console.log(results)
			onAPICall({results, queryType})
		})
	}
	render() {
		const stateOptions = states.map( (state,i) => {
			const { abbv } = state;
			return <option value={abbv} key={i}>{state.abbv}</option>
		})
		return(
			<form id="react-fyr-form" onSubmit={this.handleFormSubmission} ref={ref=>this.Form=ref}>
				<FormGroup>
					<input type="text" name="zip" id="zip" data-valid={this.state.zipIsValid ? true : null} inputMode="numeric" maxLength="5" minLength="5" pattern="^[0-9]{5}$" required ref={ref=>this.ZipField=ref} className={this.state.zipHasValue ? 'field-has-value' : null} onInput={this.handleInput} onBlur={this.handleBlur}/>
					<label htmlFor="zip" className="field-label">Enter ZIP</label>
				</FormGroup>
				<FormGroup>
					<select name="queryType" id="queryType" data-valid={this.state.queryTypeIsValid ? true : null} required className={this.state.queryTypeHasValue ? 'field-has-value' : null} onInput={this.handleInput} onBlur={this.handleBlur}>
						<option ref={ref => this.DisabledQueryTypeOption=ref}>Select...</option>
						<option value="reps">Representatives</option>
						<option value="sens">Senators</option>
						<option value="both">Sens & Reps</option>
					</select>
					<label htmlFor="queryType" className="field-label">Find me&hellip;</label>
					<label htmlFor="queryType" className="icon-dropdown">&#10095;</label>
				</FormGroup>
				<FormGroup>
					<input name="Submit" type="submit" value="Go&nbsp;&#10095;" disabled={this.state.formIsValid ? null : true} ref={ref => this.SubmitButton = ref} onClick={this.handleFormSubmission}/>
				</FormGroup>
			</form>
		)
	}
}
/* 

<select name="state" id="state" required className={this.state.stateHasValue ? 'field-has-value' : null} onBlur={this.handleBlur}>
						<optgroup label="Select State...">
							{stateOptions}
						</optgroup>
					</select>
<label htmlFor="state" className="icon-dropdown">&#10095;</label>

*/
//