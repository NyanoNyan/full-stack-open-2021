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
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exerciseNum={props.exercises1}/>
      <Part part={props.part2} exerciseNum={props.exercises2}/>
      <Part part={props.part3} exerciseNum={props.exercises3}/>

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
  return (
    <div>
      <h3>Total number of exercises: {props.totalExercises}</h3>
    </div>

  )

}

export default App