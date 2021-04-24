import React, { useState, useEffect } from 'react'
import phoneService from './services/persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import ShowPeople from './components/ShowPeople'
import FilterPeople from './components/FilterPeople'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filtered, setFilter ] = useState(persons)
	const [ message, setMessage] = useState(null)
	const [ errorMessage, setErrorMessage] = useState(null)

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
				setMessage(
					`Deleted ${name}`
				)
				setTimeout(() => {
					setMessage(null)
				}, 5000)
			})
			.catch(error => {
				setErrorMessage(
          `Information of ${name} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
						setMessage(
							`Updated ${newName}'s number`
						)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
					})
					.catch(error => {
						setErrorMessage(
							`Information of ${newName} was already removed from server`
						)
						setTimeout(() => {
							setErrorMessage(null)
						}, 5000)
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
					setMessage(
						`Added ${newName}`
					)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				})
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Notification message={message} />
			<Error errorMessage={errorMessage} />
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