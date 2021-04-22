import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DisplayWeather = ({capital}) => {
	const api_key = process.env.REACT_APP_API_KEY
	const [ weather, setWeather ] = useState([])

	useEffect(() => {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
			.then(response => {
				setWeather(response.data)
			})
	}, [])
	if (weather.length !== 0) {
		console.log(weather)
		return (
			<div>
				<h2>Weather in {capital}</h2>
				<p><b>temperature:</b> {weather.current.temperature} celcius</p>
				<img alt={capital} src={weather.current.weather_icons[0]} />
				<p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
			</div>
		)
	}else{
		return (<p>loading...</p>)
	}
}

const DisplayCountry = ({country}) => {
	
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map(language =>
					<li key={language.name}>{language.name}</li>)}
			</ul>
			<img alt={country} src={country.flag} height="100px"/>
			<DisplayWeather capital={country.capital}/>
		</div>
	)
}

const ButtonTest = () => {
	return ( <div>testing</div>)
}

const ShowCountries = ({filtered, setFilter}) => {
	console.log("im in show countries!")
	if (filtered.length === 0) {
		return (
			<p>No matches</p>
		)
	} else if (filtered.length > 10) {
		return (
			<p>Too many matches, specify another filter</p>
		)
		}else if (filtered.length > 1){
			return (
				<>
					{filtered.map(land =>
						<div key={land.name}>{land.name}<button onClick={() => {
									const reduced = new Array()
									reduced.push(land)
									setFilter(reduced)
								}
							}>show</button></div>)}
				</>
			)
		}else{
			console.log(filtered[0])
			return (
				<DisplayCountry country={filtered[0]} />
			)
		}
}

function App() {

	const [ countries, setCountries ] = useState([])
	const [ filtered, setFilter ] = useState([])

	const filterCountries = (event) => {
		setFilter(countries.filter(country => 
			country.name.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
				setFilter(response.data)
			})
	}, [])

  return (
    <div>
      find countries <input onChange={filterCountries}/>
			<ShowCountries filtered={filtered} setFilter={setFilter}/>
    </div>
  );
}

export default App;
