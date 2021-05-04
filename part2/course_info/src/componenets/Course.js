import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
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

export default Course;