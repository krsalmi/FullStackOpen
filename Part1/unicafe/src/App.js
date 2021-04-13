import React, { useState } from 'react'

const Button = ({text, handleButton}) => {
	return (
		<button onClick={handleButton}>
			{text}
		</button>
	)
}

const StatisticLine = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}


const Average = ({good, bad, all}) => {
	let average
	average = (good + (bad * -1)) / all
	return (
		<tr>
			<td>average</td>
			<td>{average}</td>
		</tr>
	)
}

const Positive = ({good, all}) => {
	let pos
	pos = (good / all) * 100
	return (
		<tr>
			<td>positive</td>
			<td>{pos} %</td>
		</tr>
	)
}

const Statistics = (props) => {
	if (props.all === 0)
		return (
			<p>No feedback given</p>
		)
	return (
		<table>
			<tbody>
			<StatisticLine text='good' value={props.good}/>
			<StatisticLine text='neutral' value={props.neutral}/>
			<StatisticLine text='bad' value={props.bad}/>
			<StatisticLine text='all' value={props.all}/>
			<Average good={props.good} bad={props.bad} all={props.all} />
			<Positive good={props.good} all={props.all} />
			</tbody>
		</table>
	)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const increaseGood = () => {
		setGood(good + 1)
		setAll(all + 1)
	}
	const increaseNeutral = () => {
		setNeutral(neutral + 1)
		setAll(all + 1)
	}
	const increaseBad = () => {
		setBad(bad + 1)	
		setAll(all + 1)
	}

  return (
    <div>
      <h1>give feedback</h1>
			<Button text='good' handleButton={increaseGood}/>
			<Button text='neutral' handleButton={increaseNeutral}/>
			<Button text='bad' handleButton={increaseBad}/>
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App