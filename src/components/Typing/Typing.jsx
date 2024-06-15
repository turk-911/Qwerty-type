import React from "react";

function Typing({
  typing,
  inputFieldValue,
  timeLeft,
  mistakes,
  wpm,
  cpm,
  initTyping,
  handleKeyDown,
  resetGame,
}) {
  return (
    <div className="section">
      <div className="time-left">
        <span>
          <b>{timeLeft}</b>
        </span>
      </div>
      <div className="section1">
        <p id="paragraph">{typing}</p>
      </div>
      
    </div>
  );
}

export default Typing;
