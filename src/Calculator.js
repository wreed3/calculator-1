import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import './Calculator.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleButtonClick = (buttonName) => {
    if (buttonName === 'AC') {
      setDisplayValue('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
      return;
    }

    if (buttonName === '±') {
      setDisplayValue(String(parseFloat(displayValue) * -1));
      return;
    }

    if (buttonName === '%') {
      setDisplayValue(String(parseFloat(displayValue) / 100));
      return;
    }

    if (buttonName === '.') {
      if (waitingForNewValue) {
        setDisplayValue('0.');
        setWaitingForNewValue(false);
      } else if (displayValue.indexOf('.') === -1) {
        setDisplayValue(displayValue + '.');
      }
      return;
    }

    if (['+', '-', '×', '÷'].includes(buttonName)) {
      if (previousValue !== null && operation !== null && !waitingForNewValue) {
        const result = calculate(previousValue, operation, parseFloat(displayValue));
        setDisplayValue(String(result));
        setPreviousValue(result);
      } else {
        setPreviousValue(parseFloat(displayValue));
      }
      setOperation(buttonName);
      setWaitingForNewValue(true);
      return;
    }

    if (buttonName === '=') {
      if (previousValue !== null && operation !== null) {
        const result = calculate(previousValue, operation, parseFloat(displayValue));
        setDisplayValue(String(result));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
      }
      return;
    }

    // Number input
    if (waitingForNewValue) {
      setDisplayValue(buttonName);
      setWaitingForNewValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? buttonName : displayValue + buttonName);
    }
  };

  const calculate = (firstOperand, operator, secondOperand) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : 0;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <ButtonPanel clickHandler={handleButtonClick} />
    </div>
  );
}

export default Calculator;