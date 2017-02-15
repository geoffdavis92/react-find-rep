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
			stateHasValue: false, 
			queryTypeHasValue: false, 
			zipIsValid: false, 
			stateIsValid: false, 
			queryTypeIsValid: false,
			formIsValid: false,
			selectedZip: null,
			selectedState: null,
			selectedQueryType: null,
			errors: []
		}
		this.handleFormSubmission = this.handleFormSubmission.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.checkIfValidFields = this.checkIfValidFields.bind(this)
	}
	checkIfValidFields() {
		console.log(this.state.zipIsValid && this.state.stateIsValid && this.state.queryTypeIsValid)
		return (this.state.zipIsValid && this.state.stateIsValid && this.state.queryTypeIsValid)
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
						formIsValid: (true && this.state.stateIsValid && this.state.queryTypeIsValid),
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
			case ('state'):
				if (value === 'Select...') {
					this.setState({
						[`${id}IsValid`]: false
					})
				} else {
					if (this.state.selectedState !== null && value !== this.state.selectedState) {
						this.ZipField.value = null;
						this.setState({
							formIsValid: (true && this.state.zipIsValid && this.state.stateIsValid),
							[`stateIsValid`]: true,
							[`selectedState`]: value,
							[`zipIsValid`]: false,
							[`selectedZip`]: null
						})
					} else {
						this.setState({
							formIsValid: (true && this.state.zipIsValid && this.state.queryTypeIsValid),
							[`stateIsValid`]: true,
							[`selectedState`]: value
						})
					}
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
						formIsValid: (true && this.state.zipIsValid && this.state.stateIsValid),
						[`queryTypeIsValid`]: true,
						[`selectedQueryType`]: value
					})
				}
			break;
			default:
			break;
		}
	}
	handleBlur(e) {
		// const { value, id } = e.target
		// // Check if input has value
		// if (value !== '' && id && value !== 'Select...') {
		// 	this.setState({
		// 		[`${id}HasValue`]: true
		// 	})
		// // eslint-disable-next-line
		// } else if (value === '' || value === 'Select...' && this.state[`${id}HasValue`]) {
		// 	this.setState({
		// 		[`${id}HasValue`]: false
		// 	})
		// }
		// // Check if value is valid
		// switch (id) {
		// 	case 'zip':
		// 		const pattern = new RegExp(/^[0-9]{5}$/)
		// 		if (pattern.test(value)) {
		// 			this.setState({
		// 				[`zipIsValid`]: true,
		// 				[`selectedZip`]: value
		// 			})
		// 		} else {
		// 			this.setState({
		// 				[`zipIsValid`]: false
		// 			})
		// 		}
		// 	break;
		// 	case ('state'):
		// 		if (value === 'Select...') {
		// 			this.setState({
		// 				[`${id}IsValid`]: false
		// 			})
		// 		} else {
		// 			if (this.state.selectedState !== null && value !== this.state.selectedState) {
		// 				this.ZipField.value = null;
		// 				this.setState({
		// 					[`stateIsValid`]: true,
		// 					[`selectedState`]: value,
		// 					[`zipIsValid`]: false,
		// 					[`selectedZip`]: null
		// 				})
		// 			} else {
		// 				this.setState({
		// 					[`stateIsValid`]: true,
		// 					[`selectedState`]: value
		// 				})
		// 			}
		// 		}
		// 	break;
		// 	case ('queryType'):
		// 		if (value === 'Select...') {
		// 			this.setState({
		// 				[`${id}IsValid`]: false
		// 			})
		// 		} else {
		// 			this.setState({
		// 				[`queryTypeIsValid`]: true,
		// 				[`selectedQueryType`]: value
		// 			})
		// 		}
		// 	break;
		// 	default:
		// 	break;
		// }
	}
	handleFormSubmission(e) {
		e.preventDefault();
		// eslint-disable-next-line
		const { reps, sens } = endpoints,
			  { zip, state, queryType } = scrapeForm(this.Form);
		console.log(zip, state, queryType)

		// if (queryType === 'both') {} else {
		// 	console.log(`${endpoints[queryType]}${location}`)
		// 	get(`${endpoints[queryType]}${location}`,null,res => {
		// 		console.log(res)
		// 	})
		// }
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
					<select name="state" id="state" data-valid={this.state.stateIsValid ? true : null} required className={this.state.stateHasValue ? 'field-has-value' : null} onInput={this.handleInput} onBlur={this.handleBlur}>
						<option ref={ref => this.DisabledStateOption=ref}>Select...</option>
						{stateOptions}
					</select>
					<label htmlFor="state" className="field-label">Select State</label>
					<label htmlFor="state" className="icon-dropdown">&#10095;</label>
				</FormGroup>
				<FormGroup>
					<select name="queryType" id="queryType" data-valid={this.state.queryTypeIsValid ? true : null} required className={this.state.queryTypeHasValue ? 'field-has-value' : null} onInput={this.handleInput} onBlur={this.handleBlur}>
						<option ref={ref => this.DisabledQueryTypeOption=ref}>Select...</option>
						<option value="reps">Representatives</option>
						<option value="sens">Senators</option>
						<option value="both">Both</option>
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