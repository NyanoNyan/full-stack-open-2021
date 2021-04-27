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
      return `${posVal} %`;
    }
  };

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <div>
        <Statistic 
          text="good"
          value={good}
        />
        <Statistic 
          text="neutral"
          value={neutral}
        />
        <Statistic 
          text="bad"
          value={bad}
        />
        <Statistic 
          text="total"
          value={total}
        />
        <Statistic 
          text="average"
          value={averageCalc()}
        />
        <Statistic 
          text="positive"
          value={postiveCalc() }
        />
      </div>
    );
  }
};

const Statistic = ( {text, value} ) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App