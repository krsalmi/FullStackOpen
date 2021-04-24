import React from 'react'

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

export default FilterPeople
