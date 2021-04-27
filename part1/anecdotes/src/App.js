import React, { useState } from 'react'

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
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const randomSelect = () => {
    const randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum);
  };

  const handleVote = () => {
    const copyArr = [...vote];
    copyArr[selected] += 1;
    setVote(copyArr);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      
      <div id="num-votes">
        {`has ${vote[selected]} votes`}
      </div>

      <div id="buttons-section">

        <VoteButton 
          name={"vote"}
          handleVote={handleVote}
        />

        <Button 
          name={"next anecdote"}
          randomSelect={randomSelect}
        />

        <MostVotes 
          votes={vote}
          anecdotes={anecdotes}
        />
      </div>

    </div>
  )
}

const Button = ( {name, randomSelect} ) => {
  return (
      <button onClick={randomSelect}>
        {name}
      </button>
  )
};

const VoteButton = ( {name, handleVote} ) => {
  return (
      <button onClick={handleVote}>
        {name}
      </button>

  );
};

const MostVotes = ( {votes, anecdotes} ) => {
  const indxLargest = votes.indexOf(Math.max(...votes));
  return (
    <>
    <div>
      <h2>Anecdote with most votes</h2>
    </div>
    <div>
      {anecdotes[indxLargest]}
    </div>
    </>
  );
};

export default App