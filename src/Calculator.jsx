import React, { useState } from 'react';
import Button from './Button';

const buttons = [
  '7','8','9','/',
  '4','5','6','*',
  '1','2','3','-',
  '0','.','=','+',
  'C'
];

const operators = ['/', '*', '-', '+', '.'];

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('');
    } 
    else if (
        operators.includes(input.slice(-1)) &&
        operators.includes(value)
    ) {
        // do nothing if last character is an operator and another operator is pressed
        return;
    }
    else if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } 
    else if (input === 'Error' ) {
        // do nothing if previous input is 'Error'
        return;
    } 
    // else if (input.slice(-1) in operators && (value === '=' || value === '+' || value === '-' || value === '*' || value === '/' || value === '.')) {
        // do nothing if last character is an operator and another operator is pressed
    // } 
    else {
        setInput(prev => prev + value);
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleKeyDown = (event) => {
    const { key } = event;
    if ((key >= '0' && key <= '9') || operators.includes(key)) {
    //   handleClick(key);
        setInput(prev => prev + key);
        console.log('Key pressed:', key);
    } else if (key === 'Enter') {
      handleClick('=');
    } else if (key === 'Backspace') {
      setInput(input.slice(0, -1));
    } else if (key === 'c' || key === 'C') {
      handleClick('C');
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="calculator">
      <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={input} readOnly aria-disabled="true" tabIndex={0} autoFocus/>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <Button key={i} value={btn} onClick={handleClick} />
        ))}
      </div>
      <div className="footer">
        <p>Simple React Calculator</p>
        <div>{ input==="Infinity"||input==="Error" ? "Please click 'C' to reset the application": "" }</div>
      </div>
    </div>
  );
}

export default Calculator;