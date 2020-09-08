import React, { useState } from 'react'

const AddCountryForm = props => {
	const initialFormState = { id: null, name: '', capital: '' }
	const [ country, setCountry ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setCountry({ ...country, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!country.name || !country.capital) return

				props.addCountry(country)
				setCountry(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={country.name} onChange={handleInputChange} />
			<p>
				<label>Capital</label>
				<input type="text" name="capital" value={country.capital} onChange={handleInputChange} />
			</p>
			<p>
				<button>Add new country</button>
			</p>
		</form>
	)
}

export default AddCountryForm
