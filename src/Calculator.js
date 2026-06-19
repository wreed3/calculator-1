import React, { Component } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

class Calculator extends Component {
  state = {
    display: '0',
    operator: null,
    waitingForOperand: false,
    firstOperand: null,
    memory: 0,
    angleMode: 'deg', // 'deg' or 'rad'
  };

  clearDisplay = () => {
    this.setState({
      display: '0',
      operator: null,
      waitingForOperand: false,
      firstOperand: null,
    });
  };

  clearAll = () => {
    this.setState({
      display: '0',
      operator: null,
      waitingForOperand: false,
      firstOperand: null,
      memory: 0,
    });
  };

  toggleSign = () => {
    const { display } = this.state;
    this.setState({
      display: display.charAt(0) === '-' ? display.substr(1) : '-' + display,
    });
  };

  inputPercent = () => {
    const { display } = this.state;
    const value = parseFloat(display);
    this.setState({
      display: String(value / 100),
    });
  };

  inputDot = () => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: '0.',
        waitingForOperand: false,
      });
    } else if (display.indexOf('.') === -1) {
      this.setState({
        display: display + '.',
      });
    }
  };

  inputDigit = (digit) => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        display: display === '0' ? String(digit) : display + digit,
      });
    }
  };

  // Scientific functions
  toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  toDegrees = (radians) => {
    return radians * (180 / Math.PI);
  };

  performScientificFunction = (func) => {
    const { display, angleMode } = this.state;
    const value = parseFloat(display);
    let result;

    try {
      switch (func) {
        case 'sin':
          result = angleMode === 'deg' 
            ? Math.sin(this.toRadians(value)) 
            : Math.sin(value);
          break;
        case 'cos':
          result = angleMode === 'deg'
            ? Math.cos(this.toRadians(value))
            : Math.cos(value);
          break;
        case 'tan':
          result = angleMode === 'deg'
            ? Math.tan(this.toRadians(value))
            : Math.tan(value);
          break;
        case 'asin':
          result = angleMode === 'deg'
            ? this.toDegrees(Math.asin(value))
            : Math.asin(value);
          break;
        case 'acos':
          result = angleMode === 'deg'
            ? this.toDegrees(Math.acos(value))
            : Math.acos(value);
          break;
        case 'atan':
          result = angleMode === 'deg'
            ? this.toDegrees(Math.atan(value))
            : Math.atan(value);
          break;
        case 'log':
          result = Math.log10(value);
          break;
        case 'ln':
          result = Math.log(value);
          break;
        case 'sqrt':
          result = Math.sqrt(value);
          break;
        case 'square':
          result = value * value;
          break;
        case 'cube':
          result = value * value * value;
          break;
        case '1/x':
          result = 1 / value;
          break;
        case 'exp':
          result = Math.exp(value);
          break;
        case 'abs':
          result = Math.abs(value);
          break;
        case 'factorial':
          result = this.factorial(value);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          return;
      }

      this.setState({
        display: String(result),
        waitingForOperand: true,
      });
    } catch (error) {
      this.setState({
        display: 'Error',
      });
    }
  };

  factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  toggleAngleMode = () => {
    this.setState((prevState) => ({
      angleMode: prevState.angleMode === 'deg' ? 'rad' : 'deg',
    }));
  };

  // Memory functions
  memoryAdd = () => {
    const { display, memory } = this.state;
    this.setState({
      memory: memory + parseFloat(display),
      waitingForOperand: true,
    });
  };

  memorySubtract = () => {
    const { display, memory } = this.state;
    this.setState({
      memory: memory - parseFloat(display),
      waitingForOperand: true,
    });
  };

  memoryRecall = () => {
    const { memory } = this.state;
    this.setState({
      display: String(memory),
      waitingForOperand: true,
    });
  };

  memoryClear = () => {
    this.setState({
      memory: 0,
    });
  };

  performOperation = (nextOperator) => {
    const { display, operator, firstOperand } = this.state;
    const inputValue = parseFloat(display);

    if (firstOperand == null) {
      this.setState({
        firstOperand: inputValue,
      });
    } else if (operator) {
      const currentValue = firstOperand || 0;
      let newValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        case '^':
          newValue = Math.pow(currentValue, inputValue);
          break;
        case 'mod':
          newValue = currentValue % inputValue;
          break;
        default:
          newValue = inputValue;
      }

      this.setState({
        display: String(newValue),
        firstOperand: newValue,
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };

  handleButtonClick = (buttonName) => {
    if (buttonName === 'AC') {
      this.clearAll();
    } else if (buttonName === 'C') {
      this.clearDisplay();
    } else if (buttonName === '+/-') {
      this.toggleSign();
    } else if (buttonName === '%') {
      this.inputPercent();
    } else if (buttonName === '.') {
      this.inputDot();
    } else if (buttonName >= '0' && buttonName <= '9') {
      this.inputDigit(parseInt(buttonName, 10));
    } else if (buttonName === '=') {
      this.performOperation(null);
    } else if (['+', '-', '×', '÷', '^', 'mod'].includes(buttonName)) {
      this.performOperation(buttonName);
    } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'square', 'cube', '1/x', 'exp', 'abs', 'factorial', 'pi', 'e'].includes(buttonName)) {
      this.performScientificFunction(buttonName);
    } else if (buttonName === 'deg/rad') {
      this.toggleAngleMode();
    } else if (buttonName === 'M+') {
      this.memoryAdd();
    } else if (buttonName === 'M-') {
      this.memorySubtract();
    } else if (buttonName === 'MR') {
      this.memoryRecall();
    } else if (buttonName === 'MC') {
      this.memoryClear();
    }
  };

  render() {
    const { display, angleMode, memory } = this.state;
    
    return (
      <div className="calculator">
        <div className="calculator-info">
          <span className="angle-mode">{angleMode.toUpperCase()}</span>
          {memory !== 0 && <span className="memory-indicator">M</span>}
        </div>
        <Display value={display} />
        <ButtonPanel onButtonClick={this.handleButtonClick} />
      </div>
    );
  }
}

export default Calculator;