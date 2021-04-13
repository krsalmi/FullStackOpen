import React, { useState } from 'react'

const MostVotes = ({points, anecdotes}) => {
	var maxIndex = points.indexOf(Math.max(...points));
	return (
		<>
			{anecdotes[maxIndex]}
			has {points[maxIndex]} points
		</>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
	const getRandom = () => setSelected(Math.floor(Math.random() * 6))
	const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

	const voteAnecdote = () => {
		const copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}

	return (
		<>
			<div>
				<h1>Anecdote of the day</h1>
				{anecdotes[selected]}
			</div>
			<div>
				has {points[selected]} points
			</div>
			<div>
				<button onClick={voteAnecdote}>vote</button>
				<button onClick={getRandom}>next anecdote</button>
			</div>
			<div>
				<h1>Anecdote with most votes</h1>
				<MostVotes points={points} anecdotes={anecdotes}/>
			</div>
		</>
  )
}

export default App