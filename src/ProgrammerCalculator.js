import React, { Component } from 'react';
import ProgrammerDisplay from './ProgrammerDisplay';
import ProgrammerButtonPanel from './ProgrammerButtonPanel';
import './Calculator.css';

export default class ProgrammerCalculator extends Component {
  state = {
    value: '0',
    displayValue: '0',
    currentBase: 'DEC', // DEC, HEX, BIN, OCT
    operation: null,
    waitingForOperand: false,
    previousValue: null
  };

  // Convert value to decimal for internal calculations
  toDecimal(value, base) {
    if (value === '0' || value === '') return 0;
    switch (base) {
      case 'BIN':
        return parseInt(value, 2);
      case 'OCT':
        return parseInt(value, 8);
      case 'DEC':
        return parseInt(value, 10);
      case 'HEX':
        return parseInt(value, 16);
      default:
        return 0;
    }
  }

  // Convert decimal value to specified base
  fromDecimal(value, base) {
    const num = parseInt(value);
    if (isNaN(num)) return '0';
    
    switch (base) {
      case 'BIN':
        return num.toString(2);
      case 'OCT':
        return num.toString(8);
      case 'DEC':
        return num.toString(10);
      case 'HEX':
        return num.toString(16).toUpperCase();
      default:
        return '0';
    }
  }

  handleDigit = (digit) => {
    const { displayValue, waitingForOperand, currentBase } = this.state;

    // Validate digit for current base
    if (!this.isValidDigit(digit, currentBase)) {
      return;
    }

    if (waitingForOperand) {
      this.setState({
        displayValue: digit,
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? digit : displayValue + digit
      });
    }
  };

  isValidDigit(digit, base) {
    switch (base) {
      case 'BIN':
        return /^[01]$/.test(digit);
      case 'OCT':
        return /^[0-7]$/.test(digit);
      case 'DEC':
        return /^[0-9]$/.test(digit);
      case 'HEX':
        return /^[0-9A-F]$/i.test(digit);
      default:
        return false;
    }
  }

  handleBaseChange = (base) => {
    const { displayValue, currentBase } = this.state;
    const decimalValue = this.toDecimal(displayValue, currentBase);
    const newDisplayValue = this.fromDecimal(decimalValue, base);
    
    this.setState({
      currentBase: base,
      displayValue: newDisplayValue
    });
  };

  handleOperation = (operation) => {
    const { displayValue, currentBase, value, waitingForOperand } = this.state;
    const inputValue = this.toDecimal(displayValue, currentBase);

    if (value == null) {
      this.setState({
        value: inputValue,
        operation,
        waitingForOperand: true
      });
    } else if (operation && !waitingForOperand) {
      const currentValue = value || 0;
      const newValue = this.performOperation(currentValue, inputValue, this.state.operation);
      
      this.setState({
        value: newValue,
        displayValue: this.fromDecimal(newValue, currentBase),
        operation,
        waitingForOperand: true
      });
    } else {
      this.setState({
        operation,
        waitingForOperand: true
      });
    }
  };

  performOperation(leftOperand, rightOperand, operation) {
    const left = parseInt(leftOperand);
    const right = parseInt(rightOperand);

    switch (operation) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return right !== 0 ? Math.floor(left / right) : 0;
      case 'AND':
        return left & right;
      case 'OR':
        return left | right;
      case 'XOR':
        return left ^ right;
      case 'LSHIFT':
        return left << right;
      case 'RSHIFT':
        return left >> right;
      case 'MOD':
        return left % right;
      default:
        return rightOperand;
    }
  }

  handleEquals = () => {
    const { displayValue, currentBase, value, operation } = this.state;

    if (!operation || value == null) return;

    const inputValue = this.toDecimal(displayValue, currentBase);
    const newValue = this.performOperation(value, inputValue, operation);

    this.setState({
      value: null,
      displayValue: this.fromDecimal(newValue, currentBase),
      operation: null,
      waitingForOperand: true
    });
  };

  handleUnaryOperation = (operation) => {
    const { displayValue, currentBase } = this.state;
    const inputValue = this.toDecimal(displayValue, currentBase);
    let result;

    switch (operation) {
      case 'NOT':
        // 32-bit NOT operation
        result = ~inputValue;
        break;
      case 'NEG':
        result = -inputValue;
        break;
      default:
        return;
    }

    this.setState({
      displayValue: this.fromDecimal(result, currentBase),
      waitingForOperand: true
    });
  };

  handleClear = () => {
    this.setState({
      value: '0',
      displayValue: '0',
      operation: null,
      waitingForOperand: false,
      previousValue: null
    });
  };

  handleClearEntry = () => {
    this.setState({
      displayValue: '0',
      waitingForOperand: true
    });
  };

  handleBackspace = () => {
    const { displayValue } = this.state;
    
    if (displayValue.length > 1) {
      this.setState({
        displayValue: displayValue.slice(0, -1)
      });
    } else {
      this.setState({
        displayValue: '0'
      });
    }
  };

  render() {
    const { displayValue, currentBase } = this.state;
    const decimalValue = this.toDecimal(displayValue, currentBase);

    return (
      <div className="calculator">
        <ProgrammerDisplay 
          value={displayValue}
          currentBase={currentBase}
          decimalValue={decimalValue}
        />
        <ProgrammerButtonPanel 
          onDigit={this.handleDigit}
          onOperation={this.handleOperation}
          onUnaryOperation={this.handleUnaryOperation}
          onEquals={this.handleEquals}
          onClear={this.handleClear}
          onClearEntry={this.handleClearEntry}
          onBackspace={this.handleBackspace}
          onBaseChange={this.handleBaseChange}
          currentBase={currentBase}
        />
      </div>
    );
  }
}