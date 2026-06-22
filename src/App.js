import React, { useState } from 'react';
import './App.css';
import Calculator from './Calculator';
import ProgrammerCalculator from './ProgrammerCalculator';
import UnitConverter from './UnitConverter';
import FinancialCalculator from './FinancialCalculator';
import DateTimeCalculator from './DateTimeCalculator';
import StatisticsCalculator from './StatisticsCalculator';

function App() {
  const [calculatorType, setCalculatorType] = useState('basic');

  const renderCalculator = () => {
    switch (calculatorType) {
      case 'basic':
        return <Calculator />;
      case 'programmer':
        return <ProgrammerCalculator />;
      case 'unit':
        return <UnitConverter />;
      case 'financial':
        return <FinancialCalculator />;
      case 'datetime':
        return <DateTimeCalculator />;
      case 'statistics':
        return <StatisticsCalculator />;
      default:
        return <Calculator />;
    }
  };

  return (
    <div className="App">
      <div className="calculator-selector">
        <button 
          className={calculatorType === 'basic' ? 'active' : ''}
          onClick={() => setCalculatorType('basic')}
        >
          Basic
        </button>
        <button 
          className={calculatorType === 'programmer' ? 'active' : ''}
          onClick={() => setCalculatorType('programmer')}
        >
          Programmer
        </button>
        <button 
          className={calculatorType === 'unit' ? 'active' : ''}
          onClick={() => setCalculatorType('unit')}
        >
          Unit Converter
        </button>
        <button 
          className={calculatorType === 'financial' ? 'active' : ''}
          onClick={() => setCalculatorType('financial')}
        >
          Financial
        </button>
        <button 
          className={calculatorType === 'datetime' ? 'active' : ''}
          onClick={() => setCalculatorType('datetime')}
        >
          Date/Time
        </button>
        <button 
          className={calculatorType === 'statistics' ? 'active' : ''}
          onClick={() => setCalculatorType('statistics')}
        >
          Statistics
        </button>
      </div>
      {renderCalculator()}
    </div>
  );
}

export default App;