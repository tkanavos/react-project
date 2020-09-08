import React, { useState, Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddCountryForm from './components/AddCountryForm'
import EditCountryForm from './components/EditCountryForm'
import CountryTable from './tables/CountryTable';
import axios from 'axios';
import './App.css'

const App = () => {

	// Data
	
		const [countriesData,setCountriesData] = useState([]);

		/*[
			{ id: 1, name: 'Greece', capital: 'Athens' },
			{ id: 2, name: 'Italy', capital: 'Rome' },
			{ id: 3, name: 'Hungary', capital: 'Budapest' },
			{ id: 4, name: 'Spain', capital: 'Madrid' },
			{ id: 5, name: 'Germany', capital: 'Berlin' },
			{ id: 6, name: 'Denmark', capital: 'Copenhagen' },
			{ id: 7, name: 'Portugal', capital: 'Lisbon' },
			{ id: 8, name: 'Russia', capital: 'Moscow' },
			{ id: 9, name: 'France', capital: 'Paris' },
			{ id: 10, name: 'Norway', capital: 'Oslo' },
		]*/
		
	const initialFormState = { id: null, name: '', capital: '' }

	// Setting state

	const [ countries, setCountries ] = useState(countriesData)
	const [ currentCountry, setCurrentCountry ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations

	const addCountry = async (country) => {
		console.log(country);
		country.id = countries.length + 1
		await axios.post(`http://localhost:3001/`,country);
		setCountries([ ...countries, country ])
	}
	
	const deleteCountry = async (id) => {
		setEditing(false)
		await axios.delete(`http://localhost:3001/${id}`);
		setCountries(countries.filter(country => country.id !== id))
	}

	const updateCountry = async (id, updatedCountry) => {
		setEditing(false)
		await axios.put(`http://localhost:3001/${id}`,updatedCountry);
		setCountries(countries.map(country => (country.id === id ? updatedCountry : country)))
	}

	useEffect(()=>{
		(async ()=>{
			const {data} = await axios.get('http://localhost:3001');
			setCountriesData(data);
			setCountries(data)
		})();
	},[])

	const editRow = async (country) => {
		setEditing(true)
		setCurrentCountry({ id: country.id, name: country.name, capital: country.capital })
	}

	return (
	<Router>
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
				  	</li>
					<li>
						<Link to="/about">About</Link>
				  	</li>
				  	<li>
						<Link to="/countries">Countries</Link>
				  	</li>
				</ul>
			</nav>
			
			<Switch>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/countries">
					<div className="container">
						<h1 id = "hed1">Countries App</h1>
						<div className="flex-row">
							<div className="flex-large classleft">
								{editing ? (
								<Fragment>
									<h2>Edit country</h2>
									<EditCountryForm
									editing={editing}
									setEditing={setEditing}
									currentCountry={currentCountry}
									updateCountry={updateCountry}
									/>
								</Fragment>
								) : (
								<Fragment>
									<h2>Add country</h2>
									<AddCountryForm addCountry={addCountry} />
								</Fragment>
								)}
							</div>
							<div className="flex-large classright">
								<h2>View Countries</h2>
								<CountryTable countries={countries} editRow={editRow} deleteCountry={deleteCountry} />
							</div>
						</div>
					</div>
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	</Router>
	)

	function Home() {
		return <h1 id = "hed2">Home</h1>;
	  }
	  
	  function About() {
		return <h1 id = "hed3">About</h1>;
	  }
}

export default App
