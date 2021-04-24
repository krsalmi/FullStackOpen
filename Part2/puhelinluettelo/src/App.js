import React, { useState, useEffect } from 'react'
import phoneService from './services/persons'


const PersonForm = ({newName, setNewName, setNewNumber}) => {
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	return (
		<>
		<h2>add a new</h2>
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

const ShowPerson = ({name, number, id, deletePerson}) => {
	return (
		<div>
			{name} {number}<button onClick={() => 
				deletePerson(id, name)
					}>delete</button>
		</div>
	)}

const ShowPeople = ({filtered, deletePerson}) => {
	return (
		<div>
			{filtered.map(person =>
				<ShowPerson key={person.name} name={person.name} number={person.number} id={person.id} deletePerson={deletePerson}/>
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
    
    phoneService
			.getAll()
			.then(people => {
				setPersons(people)
				setFilter(people)
			})
  }, [])

	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			phoneService
			.deleteObject(id)
			.then(()=> {
				const reducedList = persons.filter(person => person.id !== id)
				setFilter(reducedList)
				setPersons(reducedList)
			})
		}
	}


	const addPerson = (event) => {
		event.preventDefault()
		const phoneBookObject = {
			name: newName,
			number: newNumber,
		}
		if (persons.find(person => person.name === newName)) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
					console.log("gonna change!")
					const human = persons.find(person => person.name === newName)
					const changedInfo = { ...human, number: newNumber }
					phoneService
					.update(human.id, changedInfo)
					.then(returnedPerson => {
						setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
						setFilter(persons.map(p => p.name !== newName ? p : returnedPerson))
					})
				}
		}else {
			// const addedPeople = persons.concat(phoneBookObject)
			phoneService
			.create(phoneBookObject)
				.then(alteredPhone => {
					const addedPeople = persons.concat(phoneBookObject)
					setPersons(addedPeople)
					setFilter(addedPeople)
				})
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
			<ShowPeople filtered={filtered} deletePerson={deletePerson}/>
    </div>
  )

}

export default App