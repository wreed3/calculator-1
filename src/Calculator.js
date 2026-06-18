import React, { Component } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

class Calculator extends Component {
  state = {
    displayValue: '0',
    waitingForOperand: false,
    pendingValue: null,
    pendingOperation: null,
    angleMode: 'deg', // 'deg' or 'rad'
    memory: 0
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const { key } = event;
    
    // Number keys
    if (/[0-9]/.test(key)) {
      this.handleButtonClick(key);
    }
    
    // Operators
    const operatorMap = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
      'Enter': '=',
      'Escape': 'AC',
      '.': '.'
    };
    
    if (operatorMap[key]) {
      event.preventDefault();
      this.handleButtonClick(operatorMap[key]);
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      waitingForOperand: false,
      pendingValue: null,
      pendingOperation: null
    });
  };

  clearEntry = () => {
    this.setState({
      displayValue: '0'
    });
  };

  toggleSign = () => {
    const { displayValue } = this.state;
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    });
  };

  inputPercent = () => {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);
    this.setState({
      displayValue: String(value / 100)
    });
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      });
    }
  };

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      });
    }
  };

  performOperation = (nextOperation) => {
    const { displayValue, pendingValue, pendingOperation } = this.state;
    const inputValue = parseFloat(displayValue);

    if (pendingValue == null) {
      this.setState({
        pendingValue: inputValue
      });
    } else if (pendingOperation) {
      const currentValue = pendingValue || 0;
      const newValue = this.calculate(currentValue, inputValue, pendingOperation);

      this.setState({
        displayValue: String(newValue),
        pendingValue: newValue
      });
    }

    this.setState({
      waitingForOperand: true,
      pendingOperation: nextOperation
    });
  };

  calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case 'pow':
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    let result = 1;
    for (let i = 2; i <= Math.floor(n); i++) {
      result *= i;
    }
    return result;
  };

  handleScientificOperation = (operation) => {
    const { displayValue, angleMode } = this.state;
    const inputValue = parseFloat(displayValue);
    
    try {
      let result;
      switch(operation) {
        case 'sin':
          result = angleMode === 'deg' 
            ? Math.sin(inputValue * Math.PI / 180)
            : Math.sin(inputValue);
          break;
        case 'cos':
          result = angleMode === 'deg'
            ? Math.cos(inputValue * Math.PI / 180)
            : Math.cos(inputValue);
          break;
        case 'tan':
          result = angleMode === 'deg'
            ? Math.tan(inputValue * Math.PI / 180)
            : Math.tan(inputValue);
          break;
        case 'log':
          result = Math.log10(inputValue);
          break;
        case 'ln':
          result = Math.log(inputValue);
          break;
        case 'sqrt':
          result = Math.sqrt(inputValue);
          break;
        case 'square':
          result = Math.pow(inputValue, 2);
          break;
        case 'cube':
          result = Math.pow(inputValue, 3);
          break;
        case 'pow':
          // Store for later calculation
          this.setState({ 
            waitingForOperand: true,
            pendingOperation: 'pow',
            pendingValue: inputValue
          });
          return;
        case 'exp':
          result = Math.exp(inputValue);
          break;
        case 'factorial':
          result = this.factorial(inputValue);
          break;
        case 'inverse':
          result = 1 / inputValue;
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
      
      if (isNaN(result) || !isFinite(result)) {
        this.setState({ displayValue: 'Error' });
        return;
      }
      
      // Format result to prevent overflow
      result = parseFloat(result.toPrecision(12));
      
      this.setState({
        displayValue: String(result),
        waitingForOperand: true
      });
    } catch (error) {
      this.setState({ displayValue: 'Error' });
    }
  };

  toggleAngleMode = () => {
    this.setState(state => ({
      angleMode: state.angleMode === 'deg' ? 'rad' : 'deg'
    }));
  };

  memoryAdd = () => {
    const { displayValue, memory } = this.state;
    this.setState({ memory: memory + parseFloat(displayValue) });
  };

  memoryClear = () => {
    this.setState({ memory: 0 });
  };

  memoryRecall = () => {
    this.setState({ 
      displayValue: String(this.state.memory),
      waitingForOperand: true 
    });
  };

  handleButtonClick = (buttonName) => {
    if (this.state.displayValue === 'Error' && buttonName !== 'AC') {
      return;
    }

    if (buttonName === 'AC') {
      this.clearDisplay();
    } else if (buttonName === 'CE') {
      this.clearEntry();
    } else if (buttonName === '+/-') {
      this.toggleSign();
    } else if (buttonName === '%') {
      this.inputPercent();
    } else if (buttonName === '.') {
      this.inputDecimal();
    } else if (buttonName === '=') {
      this.performOperation(null);
    } else if (buttonName === '+' || buttonName === '−' || buttonName === '×' || buttonName === '÷') {
      this.performOperation(buttonName);
    } else if (buttonName === 'angleMode') {
      this.toggleAngleMode();
    } else if (buttonName === 'MC') {
      this.memoryClear();
    } else if (buttonName === 'MR') {
      this.memoryRecall();
    } else if (buttonName === 'M+') {
      this.memoryAdd();
    } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'square', 'cube', 'pow', 'exp', 'factorial', 'inverse', 'pi', 'e'].includes(buttonName)) {
      this.handleScientificOperation(buttonName);
    } else {
      this.inputDigit(parseInt(buttonName, 10));
    }
  };

  render() {
    const { displayValue, angleMode, memory } = this.state;

    return (
      <div className="calculator">
        <Display 
          value={displayValue} 
          angleMode={angleMode}
          hasMemory={memory !== 0}
        />
        <ButtonPanel 
          onButtonClick={this.handleButtonClick}
          angleMode={angleMode}
        />
      </div>
    );
  }
}

export default Calculator;