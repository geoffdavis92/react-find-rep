/* eslint-disable */
export function scrapeForm (formElement) {
	const formData = {},
		  getInputValues = [].slice.call(formElement.children).forEach(formGroup => {
			[].slice.call(formGroup.children).forEach(element => {
				if (element.value) {
					const { value, name } = element
					if (name.indexOf('Submit') < 0 ) {
						formData[name] = value;
					}
				}
			})
		});
	return formData
}

export function externalLink() {
	return { target: '_blank', rel: 'noopener noreferrer' }
}