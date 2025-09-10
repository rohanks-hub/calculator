import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const buttons = [
    "C", "√", "%", "/",
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  const calculate = (expression) => {
    try {
      const sanitized = expression.replace(/x/g, "*");
      const result = Function('"use strict";return (' + sanitized + ')')();
      return result.toString();
    } catch {
      return "Error";
    }
  };

  const handleButtonClick = (value) => {
    console.log("Clicked:", value);

    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      setDisplay(calculate(display));
    } else if (value === "√") {
      setDisplay(Math.sqrt(Number(calculate(display))).toString());
    } else if (value === "%") {
      setDisplay((Number(calculate(display)) / 100).toString());
    } else {
      const newValue = value === "x" ? "*" : value;
      setDisplay(prev => prev + newValue);
    }
  };

  const handleAnimatedClick = (value) => {
    setActiveButton(value);
    handleButtonClick(value);
    setTimeout(() => setActiveButton(null), 150);
  };

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <input type="text" id="display" value={display} disabled />
      <div className="buttons">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className={`btn ${activeButton === btn ? "clicked" : ""}`}
            onClick={() => handleAnimatedClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
