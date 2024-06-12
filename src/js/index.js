import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types'

// include your styles into the webpack bundle
import "../styles/index.css";
import "./icons.js";

function SimpleCounter(props) {
  return (
    <div className="bigCounter">
      <div className="calendar">
        <i className="fas fa-clock"></i>
      </div>
      <div className="six">{props.digitFour % 10}</div>
      <div className="five">{props.digitFour % 10}</div>
      <div className="four">{props.digitFour % 10}</div>
      <div className="three">{props.digitThree % 10}</div>
      <div className="two">{props.digitTwo % 10}</div>
      <div className="one">{props.digitOne % 10}</div>
    </div>
  );
}

SimpleCounter.propTypes = {
  digitFour: PropTypes.number,
  digitThree: PropTypes.number,
  digitTwo: PropTypes.number,
  digitOne: PropTypes.number
};

function Countdown() {
  const [counter, setCounter] = useState(0);
  const [targetTime, setTargetTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasReachedTargetTime, setHasReachedTargetTime] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setCounter(counter + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, counter]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setCounter(0);
    setIsRunning(false);
    setHasReachedTargetTime(false);
  };

  const handleSetTargetTime = (time) => {
    setTargetTime(time);
  };

  const checkTargetTime = () => {
    if (isRunning && targetTime && counter >= targetTime && !hasReachedTargetTime) {
      alert(`¡Has alcanzado tu tiempo objetivo de ${targetTime} segundos!`);
      setHasReachedTargetTime(true);
    }
  };

  return (
    <div>
      <SimpleCounter
        digitOne={counter % 10}
        digitTwo={Math.floor(counter / 10) % 10}
        digitThree={Math.floor(counter / 100) % 10}
        digitFour={Math.floor(counter / 1000) % 10}
      />
      <button onClick={handleStart}>Iniciar</button>
      <button onClick={handleStop}>Parar</button>
      <button onClick={handleReset}>Reiniciar</button>
      <input
        type="number"
        value={targetTime}
        onChange={(e) => handleSetTargetTime(e.target.value)}
        placeholder="Ingrese su tiempo objetivo"
      />
      {checkTargetTime()}
    </div>
  );
}

ReactDOM.render(<Countdown />, document.querySelector("#app"));
