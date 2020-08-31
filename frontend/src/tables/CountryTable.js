import React from 'react'

const CountryTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Capital</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.countries.length > 0 ? (
        props.countries.map(country => (
          <tr key={country.id}>
            <td>{country.name}</td>
            <td>{country.capital}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(country)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteCountry(country.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No countries</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default CountryTable
