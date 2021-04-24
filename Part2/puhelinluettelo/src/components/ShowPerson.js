import React from 'react'

const ShowPerson = ({name, number, id, deletePerson}) => {
	return (
		<div>
			{name} {number}<button onClick={() => 
				deletePerson(id, name)
					}>delete</button>
		</div>
	)}

export default ShowPerson
