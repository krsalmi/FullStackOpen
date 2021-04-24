import React from 'react'

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

export default PersonForm
