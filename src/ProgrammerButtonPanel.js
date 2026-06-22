import React from 'react';
import './ProgrammerButtonPanel.css';

export default function ProgrammerButtonPanel({ 
  onDigit, 
  onOperation, 
  onUnaryOperation,
  onEquals, 
  onClear, 
  onClearEntry,
  onBackspace,
  onBaseChange,
  currentBase 
}) {
  const handleClick = (buttonName) => {
    if (/^[0-9A-F]$/.test(buttonName)) {
      onDigit(buttonName);
    } else if (buttonName === '=') {
      onEquals();
    } else if (buttonName === 'AC') {
      onClear();
    } else if (buttonName === 'CE') {
      onClearEntry();
    } else if (buttonName === '←') {
      onBackspace();
    } else if (['HEX', 'DEC', 'OCT', 'BIN'].includes(buttonName)) {
      onBaseChange(buttonName);
    } else if (buttonName === 'NOT' || buttonName === 'NEG') {
      onUnaryOperation(buttonName);
    } else {
      onOperation(buttonName);
    }
  };

  const isDisabled = (button) => {
    if (currentBase === 'BIN' && !/^[01]$/.test(button) && /^[0-9A-F]$/.test(button)) {
      return true;
    }
    if (currentBase === 'OCT' && !/^[0-7]$/.test(button) && /^[0-9A-F]$/.test(button)) {
      return true;
    }
    if (currentBase === 'DEC' && !/^[0-9]$/.test(button) && /^[0-9A-F]$/.test(button)) {
      return true;
    }
    return false;
  };

  const Button = ({ label, className = '', onClick }) => (
    <button 
      className={`prog-button ${className} ${isDisabled(label) ? 'disabled' : ''}`}
      onClick={() => !isDisabled(label) && onClick(label)}
      disabled={isDisabled(label)}
    >
      {label}
    </button>
  );

  return (
    <div className="programmer-button-panel">
      {/* Base Selection Row */}
      <div className="button-row">
        <Button 
          label="HEX" 
          className={`base-button ${currentBase === 'HEX' ? 'active' : ''}`}
          onClick={handleClick}
        />
        <Button 
          label="DEC" 
          className={`base-button ${currentBase === 'DEC' ? 'active' : ''}`}
          onClick={handleClick}
        />
        <Button 
          label="OCT" 
          className={`base-button ${currentBase === 'OCT' ? 'active' : ''}`}
          onClick={handleClick}
        />
        <Button 
          label="BIN" 
          className={`base-button ${currentBase === 'BIN' ? 'active' : ''}`}
          onClick={handleClick}
        />
      </div>

      {/* Hex Letters Row */}
      <div className="button-row">
        <Button label="A" onClick={handleClick} />
        <Button label="B" onClick={handleClick} />
        <Button label="C" onClick={handleClick} />
        <Button label="D" onClick={handleClick} />
        <Button label="E" onClick={handleClick} />
        <Button label="F" onClick={handleClick} />
      </div>

      {/* Bitwise Operations Row */}
      <div className="button-row">
        <Button label="AND" className="operation" onClick={handleClick} />
        <Button label="OR" className="operation" onClick={handleClick} />
        <Button label="XOR" className="operation" onClick={handleClick} />
        <Button label="NOT" className="operation" onClick={handleClick} />
      </div>

      {/* Shift Operations Row */}
      <div className="button-row">
        <Button label="LSHIFT" className="operation small-text" onClick={handleClick} />
        <Button label="RSHIFT" className="operation small-text" onClick={handleClick} />
        <Button label="MOD" className="operation" onClick={handleClick} />
        <Button label="NEG" className="operation" onClick={handleClick} />
      </div>

      {/* Number Pad - Row 1 */}
      <div className="button-row">
        <Button label="AC" className="function" onClick={handleClick} />
        <Button label="CE" className="function" onClick={handleClick} />
        <Button label="←" className="function" onClick={handleClick} />
        <Button label="/" className="operation" onClick={handleClick} />
      </div>

      {/* Number Pad - Row 2 */}
      <div className="button-row">
        <Button label="7" onClick={handleClick} />
        <Button label="8" onClick={handleClick} />
        <Button label="9" onClick={handleClick} />
        <Button label="*" className="operation" onClick={handleClick} />
      </div>

      {/* Number Pad - Row 3 */}
      <div className="button-row">
        <Button label="4" onClick={handleClick} />
        <Button label="5" onClick={handleClick} />
        <Button label="6" onClick={handleClick} />
        <Button label="-" className="operation" onClick={handleClick} />
      </div>

      {/* Number Pad - Row 4 */}
      <div className="button-row">
        <Button label="1" onClick={handleClick} />
        <Button label="2" onClick={handleClick} />
        <Button label="3" onClick={handleClick} />
        <Button label="+" className="operation" onClick={handleClick} />
      </div>

      {/* Number Pad - Row 5 */}
      <div className="button-row">
        <Button label="0" className="wide" onClick={handleClick} />
        <Button label="=" className="equals" onClick={handleClick} />
      </div>
    </div>
  );
}