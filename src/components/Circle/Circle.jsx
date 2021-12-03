import React from 'react';

import './Circle.css';

const Circle = ({ randomNumber }) => {
  return (
    <div className="circle">
      <h1>{randomNumber}</h1>
    </div>
  );
};

export default Circle;
