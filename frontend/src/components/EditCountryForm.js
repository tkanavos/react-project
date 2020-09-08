import React, { useState, useEffect } from 'react'

const EditCountryForm = props => {
  const {updateCountry} = props;
  const [ country, setCountry ] = useState(props.currentCountry)

  useEffect(
    () => {
      setCountry(props.currentCountry)
    },
    [ props ]
  )

  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setCountry({ ...country, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        updateCountry(country.id, country)
      }}>
      <label>Name</label>
      <input type="text" name="name" value={country.name} onChange={handleInputChange} />
      <p>
        <label>Capital</label>
        <input type="text" name="capital" value={country.capital} onChange={handleInputChange} />
      </p>
      <p>
        <button>Update Country</button>
        <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
        </button>
      </p>
    </form>
  )
}

export default EditCountryForm