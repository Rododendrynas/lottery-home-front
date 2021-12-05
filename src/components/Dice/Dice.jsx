import React from 'react';

import './Dice.css';

const Dice = ({ randomNumber }) => {
  return (
    <div className="dice">
      <h1 className="luckyNumber">{randomNumber}</h1>
    </div>
  );
};

export default Dice;
