import React from 'react';
import './ProgrammerDisplay.css';

export default function ProgrammerDisplay({ value, currentBase, decimalValue }) {
  const toBase = (val, base) => {
    const num = parseInt(val);
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
  };

  return (
    <div className="programmer-display">
      <div className="base-displays">
        <div className={`base-row ${currentBase === 'HEX' ? 'active' : ''}`}>
          <span className="base-label">HEX</span>
          <span className="base-value">{toBase(decimalValue, 'HEX')}</span>
        </div>
        <div className={`base-row ${currentBase === 'DEC' ? 'active' : ''}`}>
          <span className="base-label">DEC</span>
          <span className="base-value">{toBase(decimalValue, 'DEC')}</span>
        </div>
        <div className={`base-row ${currentBase === 'OCT' ? 'active' : ''}`}>
          <span className="base-label">OCT</span>
          <span className="base-value">{toBase(decimalValue, 'OCT')}</span>
        </div>
        <div className={`base-row ${currentBase === 'BIN' ? 'active' : ''}`}>
          <span className="base-label">BIN</span>
          <span className="base-value">{toBase(decimalValue, 'BIN')}</span>
        </div>
      </div>
      <div className="main-display">
        {value}
      </div>
    </div>
  );
}