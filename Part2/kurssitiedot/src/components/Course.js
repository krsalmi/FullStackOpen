import React from 'react'

const Course = ({course}) => {
	return (
		<div>
				<Header name={course.name} />
				<Content parts={course.parts} />
				<Total parts={course.parts} />
		</div>
	)
}

const Total = ({parts}) => {
	const total = parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
		<h4>total of {total} exercises</h4>
	)
}

const Header = ({name}) => {
	return (
		<>
			<h2>{name}</h2>
		</>
	)
}

const Content = ({parts}) => {
	return (
		<div>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</div>
	)
}

const Part = ({part}) => {
	return (
		<p>{part.name} {part.exercises}</p>
	)
}

export default Course