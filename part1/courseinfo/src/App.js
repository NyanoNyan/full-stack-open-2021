import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => {
  const [first, second, third] = props.parts;
  return (
    <div>
      <Part part={first.name} exerciseNum={first.exercises}/>
      <Part part={second.name} exerciseNum={second.exercises}/>
      <Part part={third.name} exerciseNum={third.exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <h3>{props.part}</h3>
      <p>Number of exercises: {props.exerciseNum}</p>
    </div>

  )
}

const Total = (props) => {
  const holder = props.parts;
  const total = holder.reduce((accum, currValue) => accum + currValue.exercises, 0);
  console.log(total);
  return (
    <div>
      <h3>Total number of exercises: {total}</h3>
    </div>

  )

}

export default App