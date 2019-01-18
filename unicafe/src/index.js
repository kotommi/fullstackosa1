import React, { useState } from "react";
import ReactDOM from "react-dom";

const Feedback = ({ incGood, incNeutral, incBad }) => {
  return (
    <div>
      <h1>anna palautetta</h1>
      <p>
        <Button handleClick={incGood} text="hyvä" />
        <Button handleClick={incNeutral} text="neutraali" />
        <Button handleClick={incBad} text="huono" />
      </p>
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  var sum = good + neutral + bad;
  if (sum === 0) {
    return <div>Ei yhtään palautetta annettu</div>;
  }
  return (
    <div>
      <h1>statistiikka</h1>
      <table>
        <tbody>
          <Statistic name="hyvä" stat={good} />
          <Statistic name="neutraali" stat={neutral} />
          <Statistic name="huono" stat={bad} />
          <Statistic name="yhteensä" stat={sum} />
          <Statistic name="keskiarvo" stat={(good - bad) / sum} />
          <Statistic name="positiivisia" stat={(good / sum) * 100 + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ name, stat }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{stat}</td>
    </tr>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incGood = () => {
    setGood(good + 1);
  };

  const incNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Feedback incGood={incGood} incNeutral={incNeutral} incBad={incBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
