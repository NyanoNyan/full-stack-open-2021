import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const totalExercises = part1.exercises + part2.exercises + part3.exercises

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1 = {part1.name}
        part2 = {part2.name}
        part3 = {part3.name}
        exercises1 = {part1.exercises}
        exercises2 = {part2.exercises}
        exercises3 = {part3.exercises}
      />
      <Total totalExercises={totalExercises}/>
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