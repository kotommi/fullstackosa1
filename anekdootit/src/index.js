import React, { useState } from "react";
import ReactDOM from "react-dom";

const ButtonGroup = ({ handleRandomClick, handleVoteClick }) => {
  return (
    <p>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleRandomClick} text="next anecdote" />
    </p>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ anecdotes, selected, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const Mostvotes = ({ anecdotes, getMost }) => {
  const [index, votes] = getMost();
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));
  const randomSelected = () => {
    let cur = selected;
    while (cur === selected) {
      cur = Math.floor(Math.random() * 6);
    }
    setSelected(cur);
  };
  const addVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };
  const getMost = () => {
    let max = points[0];
    let index = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i] > max) {
        max = points[i];
        index = i;
      }
    }
    return [index, max];
  };

  return (
    <div>
      <Anecdote
        anecdotes={props.anecdotes}
        selected={selected}
        votes={points[selected]}
      />
      <ButtonGroup
        handleRandomClick={randomSelected}
        handleVoteClick={addVote}
      />
      <Mostvotes anecdotes={props.anecdotes} getMost={getMost} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
