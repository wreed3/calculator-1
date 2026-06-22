import React, { useState } from 'react';
import './ProgrammerCalculator.css';

function ProgrammerCalculator() {
  const [value, setValue] = useState('0');
  const [base, setBase] = useState('dec');

  const convertToBase = (num, targetBase) => {
    const decimal = parseInt(num, getRadix(base));
    if (isNaN(decimal)) return '0';
    
    switch (targetBase) {
      case 'bin':
        return decimal.toString(2);
      case 'oct':
        return decimal.toString(8);
      case 'dec':
        return decimal.toString(10);
      case 'hex':
        return decimal.toString(16).toUpperCase();
      default:
        return decimal.toString(10);
    }
  };

  const getRadix = (baseType) => {
    switch (baseType) {
      case 'bin': return 2;
      case 'oct': return 8;
      case 'dec': return 10;
      case 'hex': return 16;
      default: return 10;
    }
  };

  const handleBaseChange = (newBase) => {
    const decimal = parseInt(value, getRadix(base));
    if (!isNaN(decimal)) {
      setValue(convertToBase(value, newBase));
    }
    setBase(newBase);
  };

  return (
    <div className="programmer-calculator">
      <h2>Programmer Calculator</h2>
      <div className="base-selector">
        <button 
          className={base === 'bin' ? 'active' : ''}
          onClick={() => handleBaseChange('bin')}
        >
          BIN
        </button>
        <button 
          className={base === 'oct' ? 'active' : ''}
          onClick={() => handleBaseChange('oct')}
        >
          OCT
        </button>
        <button 
          className={base === 'dec' ? 'active' : ''}
          onClick={() => handleBaseChange('dec')}
        >
          DEC
        </button>
        <button 
          className={base === 'hex' ? 'active' : ''}
          onClick={() => handleBaseChange('hex')}
        >
          HEX
        </button>
      </div>
      <div className="display">{value}</div>
      <p className="info">Programmer Calculator - Binary, Octal, Decimal, Hexadecimal conversions</p>
    </div>
  );
}

export default ProgrammerCalculator;