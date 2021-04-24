import React from 'react'
import ShowPerson from './ShowPerson'

const ShowPeople = ({filtered, deletePerson}) => {
	return (
		<div>
			{filtered.map(person =>
				<ShowPerson key={person.name} name={person.name} number={person.number} id={person.id} deletePerson={deletePerson}/>
			)}
		</div>
	)
}

export default ShowPeople
