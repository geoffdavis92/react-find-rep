const endpoints = {
	all: {},
	reps: {
		state: `http://whoismyrepresentative.com/getall_reps_bystate.php?output=json&state=`
	},
	sens: {
		state: `http://whoismyrepresentative.com/getall_sens_bystate.php?output=json&state=`
	}
}

const states = [
	{ stateName:'Alabama', abbv: 'AL' },
	{ stateName:'Alaska', abbv: 'AK' },
	{ stateName:'Arizona', abbv: 'AZ' },
	{ stateName:'Arkansas', abbv: 'AR' },
	{ stateName:'California', abbv: 'CA' },
	{ stateName:'Colorado', abbv: 'CO' },
	{ stateName:'Connecticut', abbv: 'CT' },
	{ stateName:'Delaware', abbv: 'DE' },
	{ stateName:'Florida', abbv: 'FL' },
	{ stateName:'Georgia', abbv: 'GA' },
	{ stateName:'Hawaii', abbv: 'HI' },
	{ stateName:'Idaho', abbv: 'ID' },
	{ stateName:'Illinois', abbv: 'IL' },
	{ stateName:'Indiana', abbv: 'IN' },
	{ stateName:'Iowa', abbv: 'IA' },
	{ stateName:'Kansas', abbv: 'KS' },
	{ stateName:'Kentucky', abbv: 'KY' },
	{ stateName:'Louisiana', abbv: 'LA' },
	{ stateName:'Maine', abbv: 'ME' },
	{ stateName:'Maryland', abbv: 'MD' },
	{ stateName:'Massachusetts', abbv: 'MA' },
	{ stateName:'Michigan', abbv: 'MI' },
	{ stateName:'Minnesota', abbv: 'MN' },
	{ stateName:'Mississippi', abbv: 'MS' },
	{ stateName:'Missouri', abbv: 'MO' },
	{ stateName:'Montana', abbv: 'MT' },
	{ stateName:'Nebraska', abbv: 'NE' },
	{ stateName:'Nevada', abbv: 'NV' },
	{ stateName:'New Hampshire', abbv: 'NH' },
	{ stateName:'New Jersey', abbv: 'NJ' },
	{ stateName:'New Mexico', abbv: 'NM' },
	{ stateName:'New York', abbv: 'NY' },
	{ stateName:'North Carolina', abbv: 'NC' },
	{ stateName:'North Dakota', abbv: 'ND' },
	{ stateName:'Ohio', abbv: 'OH' },
	{ stateName:'Oklahoma', abbv: 'OK' },
	{ stateName:'Oregon', abbv: 'OR' },
	{ stateName:'Pennsylvania', abbv: 'PA' },
	{ stateName: 'Rhode Island', abbv: 'RI' },
	{ stateName:'South Carolina', abbv: 'SC' },
	{ stateName:'South Dakota', abbv: 'SD' },
	{ stateName:'Tennessee', abbv: 'TN' },
	{ stateName:'Texas', abbv: 'TX' },
	{ stateName:'Utah', abbv: 'UT' },
	{ stateName:'Vermont', abbv: 'VT' },
	{ stateName:'Virginia', abbv: 'VA' },
	{ stateName:'Washington', abbv: 'WA' },
	{ stateName:'West Virginia', abbv: 'WV' },
	{ stateName:'Wisconsin', abbv: 'WI' },
	{ stateName:'Wyoming', abbv: 'WY' }
]

export default states;

export { endpoints }