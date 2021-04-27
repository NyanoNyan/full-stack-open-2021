import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateButton = (name) => {
    if (name === "good") {
      setGood(good + 1);
    } else if (name === "neutral") {
      setNeutral(neutral + 1);
    } else if (name === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <Title name={"give feedback"}/> 

      <Button 
        name={"good"}
        updateButton={updateButton}
      />

      <Button 
        name={"neutral"}
        updateButton={updateButton}
      />

      <Button 
        name={"bad"}
        updateButton={updateButton}
      />

      <Title name={"statistics"}/>

      <Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
      />
    </div>
  )
}

const Title = ( {name} ) => {
  return (
    <h2>{name}</h2>
  )
};

const Button = ( {name, updateButton}) => {
  return (
    <button onClick={() => updateButton(name)}>{name}</button>
  )
};

const Statistics = ( {good, neutral, bad} ) => {
  let total = good + neutral + bad;

  if (isNaN(total)){
    total = 0;
  }

  const averageCalc = () => {
    const avg = (good-bad)/total;
    if (isNaN(avg)) {
      return 0;
    } else {
      return avg;
    }
  };

  const postiveCalc = () => {
    const posVal = (good/total) *100;
    if (isNaN(posVal)) {
      return 0;
    } else {
      return posVal;
    }
  };

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {averageCalc()}</p>
        <p>positive {postiveCalc()} %</p>
      </div>
    );
  }


};

export default App