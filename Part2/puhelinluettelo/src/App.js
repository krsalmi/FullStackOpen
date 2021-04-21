import React, { useState, useEffect } from 'react'
import axios from 'axios'


const PersonForm = ({newName, setNewName, setNewNumber}) => {
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	return (
		<>
			<div>
					name: <input value={newName} onChange={handleNameChange}/>
			</div>
			<div>
			number: <input onChange={handleNumberChange}/>
			</div>
			<div>
          <button type="submit">add</button>
        </div>
		</>
	)
}

const ShowPerson = ({name, number}) => <p>{name} {number}</p>

const ShowPeople = ({filtered}) => {
	return (
		<div>
			{filtered.map(person =>
				<ShowPerson key={person.name} name={person.name} number={person.number}/>
			)}
		</div>
	)
}

const FilterPeople = ({setFilter, persons}) => {
	const filterNames = (event) => {
		if (event.target.value !== '')
			setFilter(persons.filter(person => 
				person.name.toLowerCase().includes(event.target.value.toLowerCase())))
		else
				setFilter(persons)
		}
	return (
	<div>
          filter shown with <input onChange={filterNames}/>
  </div>
	)
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filtered, setFilter ] = useState(persons)

	useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
				setFilter(response.data)
      })
  }, [])
  console.log('render', persons.length, 'people')

	const addPerson = (event) => {
		event.preventDefault()
		const phoneBookObject = {
			name: newName,
			number: newNumber,
		}
		if (persons.find(person => person.name === newName))
			alert(`${newName} is already added to phonebook`)
		else {
			const addedPeople = persons.concat(phoneBookObject)
			setPersons(addedPeople)
			setFilter(addedPeople)
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
				<FilterPeople setFilter={setFilter} persons={persons}/>
        <PersonForm newName={newName} setNewName={setNewName} setNewNumber={setNewNumber}/>
      </form>
      <h2>Numbers</h2>
			<ShowPeople filtered={filtered} />
    </div>
  )

}

export default App