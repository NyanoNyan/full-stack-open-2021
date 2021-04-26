import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const totalExercises = exercises1 + exercises2 + exercises3

  return (
    <div>
      <Header course={course} />
      <Content  
        part1 = {part1}
        part2 = {part2}
        part3 = {part3}
        exercises1 = {exercises1}
        exercises2 = {exercises2}
        exercises3 = {exercises3}
      />
      <Total  totalExercises = {totalExercises}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <h3>Part 1: {props.part1}</h3>
      <p>Number of exercises: {props.exercises1}</p>

      <h3>Part 2: {props.part2}</h3>
      <p>Number of exercises: {props.exercises2}</p>

      <h3>Part 3: {props.part3}</h3>
      <p>Number of exercises: {props.exercises3}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <h3>Total number of exercises: {props.totalExercises}</h3>
    </>

  )

}

export default App