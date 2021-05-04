import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  // console.log(course.parts);
  const sum = course.parts.reduce((accum, curr) => accum + curr.exercises, 0);
  return(
    <h4>Total of {sum} exercises</h4>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  const contentVal = course.parts.map(item => 
    <Part 
      key={item.id} 
      part={item}
    />
  );
  
  return (
    <div>
      {contentVal}
    </div>
  )
}

const Course = ( {course} ) => {

  const courseDivs = course.map((courseItem) =>
      <div key={courseItem.id}>
        <Header course = {courseItem} />
        <Content course = {courseItem} />
        <Total course = {courseItem} />
      </div>
    );

  return courseDivs;
};


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))