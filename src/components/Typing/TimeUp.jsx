import React from 'react'

function TimeUp({wpm, cpm, mistakes, accuracy}) {
  return (
    <div>
      <h2>Results: </h2>
      <div>
        <p>Words Per Minute: </p>
        <span>{wpm}</span>
      </div>
      <div>
        <p>Characters Per Minute: </p>
        <span>{cpm}</span>
      </div>
      <div>
        <p>Mistakes: </p>
        <span>{mistakes}</span>
      </div>
      <div>
        <p>Accuracy: </p>
        <span>{accuracy}%</span>
      </div>
    </div>
  );
}

export default TimeUp