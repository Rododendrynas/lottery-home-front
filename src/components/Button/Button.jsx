import React from "react";

import "./Button.css";

const Button = ({ type, color, onClick, children }) => {
  return (
    <button
      className={`button is-${color}`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
