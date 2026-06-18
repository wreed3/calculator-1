import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

class Calculator extends React.Component {
  state = {
    displayValue: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    angleMode: 'deg', // 'deg' or 'rad'
    memory: 0,
    pendingOperation: null,
    pendingValue: null
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

  handleButtonClick = (buttonName) => {
    // Handle angle mode toggle
    if (buttonName === 'angleMode') {
      this.toggleAngleMode();
      return;
    }

    // Handle memory functions
    if (buttonName === 'MC') {
      this.memoryClear();
      return;
    }
    if (buttonName === 'MR') {
      this.memoryRecall();
      return;
    }
    if (buttonName === 'M+') {
      this.memoryAdd();
      return;
    }

    // Handle clear
    if (buttonName === 'AC') {
      this.setState({
        displayValue: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        pendingOperation: null,
        pendingValue: null
      });
      return;
    }

    // Handle scientific operations
    const scientificOps = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'square', 'cube', 'pow', 'exp', 'factorial', 'inverse', 'pi', 'e'];
    if (scientificOps.includes(buttonName)) {
      this.handleScientificOperation(buttonName);
      return;
    }

    // Handle numbers
    if (/[0-9]/.test(buttonName)) {
      this.inputDigit(buttonName);
      return;
    }

    // Handle decimal point
    if (buttonName === '.') {
      this.inputDecimal();
      return;
    }

    // Handle operators
    if (['+', '−', '×', '÷'].includes(buttonName)) {
      this.performOperation(buttonName);
      return;
    }

    // Handle equals
    if (buttonName === '=') {
      this.performOperation(buttonName);
      return;
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

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '0.',
        waitingForOperand: false
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.'
      });
    }
  };

  performOperation = (nextOperation) => {
    const { displayValue, previousValue, operation } = this.state;
    const inputValue = parseFloat(displayValue);

    if (previousValue == null) {
      this.setState({
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true
      });
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = this.calculate(currentValue, inputValue, operation);

      this.setState({
        displayValue: String(newValue),
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true
      });
    }
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
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  handleScientificOperation = (operation) => {
    try {
      const { displayValue, angleMode, pendingOperation, pendingValue } = this.state;
      const inputValue = parseFloat(displayValue);
      
      let result;
      
      // Handle constants
      if (operation === 'pi') {
        result = Math.PI;
      } else if (operation === 'e') {
        result = Math.E;
      }
      // Handle operations that need a value
      else {
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
            // Store for later calculation with next input
            this.setState({ 
              waitingForOperand: true,
              previousValue: inputValue,
              operation: 'pow'
            });
            return;
          case 'exp':
            result = Math.exp(inputValue);
            break;
          case 'factorial':
            result = this.factorial(Math.floor(inputValue));
            break;
          case 'inverse':
            result = 1 / inputValue;
            break;
          default:
            return;
        }
      }
      
      // Check for errors
      if (isNaN(result) || !isFinite(result)) {
        this.setState({ displayValue: 'Error' });
        return;
      }
      
      // Format result to prevent overflow
      result = parseFloat(result.toPrecision(12));
      
      this.setState({
        displayValue: String(result),
        waitingForOperand: true,
        previousValue: null,
        operation: null
      });
    } catch (error) {
      this.setState({ displayValue: 'Error' });
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
    this.setState(state => ({
      angleMode: state.angleMode === 'deg' ? 'rad' : 'deg'
    }));
  };

  memoryAdd = () => {
    const { displayValue, memory } = this.state;
    const value = parseFloat(displayValue);
    if (!isNaN(value)) {
      this.setState({ memory: memory + value });
    }
  };

  memoryClear = () => {
    this.setState({ memory: 0 });
  };

  memoryRecall = () => {
    const { memory } = this.state;
    this.setState({ 
      displayValue: String(memory),
      waitingForOperand: true 
    });
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