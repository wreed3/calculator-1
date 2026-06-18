import React from 'react';
import Button from './Button';
import './ButtonPanel.css';

export default function ButtonPanel({ onButtonClick, angleMode }) {
  return (
    <div className="button-panel">
      {/* Mode and Memory Row */}
      <div className="button-row">
        <Button text={angleMode.toUpperCase()} onClick={() => onButtonClick('angleMode')} className="function" />
        <Button text="MC" onClick={() => onButtonClick('MC')} className="memory" />
        <Button text="MR" onClick={() => onButtonClick('MR')} className="memory" />
        <Button text="M+" onClick={() => onButtonClick('M+')} className="memory" />
        <Button text="AC" onClick={() => onButtonClick('AC')} className="clear" />
      </div>
      
      {/* Scientific Functions Row 1 */}
      <div className="button-row">
        <Button text="sin" onClick={() => onButtonClick('sin')} className="function" />
        <Button text="cos" onClick={() => onButtonClick('cos')} className="function" />
        <Button text="tan" onClick={() => onButtonClick('tan')} className="function" />
        <Button text="π" onClick={() => onButtonClick('pi')} className="function" />
        <Button text="e" onClick={() => onButtonClick('e')} className="function" />
      </div>
      
      {/* Scientific Functions Row 2 */}
      <div className="button-row">
        <Button text="x²" onClick={() => onButtonClick('square')} className="function" />
        <Button text="x³" onClick={() => onButtonClick('cube')} className="function" />
        <Button text="xʸ" onClick={() => onButtonClick('pow')} className="function" />
        <Button text="√" onClick={() => onButtonClick('sqrt')} className="function" />
        <Button text="!" onClick={() => onButtonClick('factorial')} className="function" />
      </div>
      
      {/* Scientific Functions Row 3 */}
      <div className="button-row">
        <Button text="log" onClick={() => onButtonClick('log')} className="function" />
        <Button text="ln" onClick={() => onButtonClick('ln')} className="function" />
        <Button text="eˣ" onClick={() => onButtonClick('exp')} className="function" />
        <Button text="1/x" onClick={() => onButtonClick('inverse')} className="function" />
        <Button text="%" onClick={() => onButtonClick('%')} className="function" />
      </div>
      
      {/* Number Pad */}
      <div className="button-row">
        <Button text="7" onClick={() => onButtonClick('7')} />
        <Button text="8" onClick={() => onButtonClick('8')} />
        <Button text="9" onClick={() => onButtonClick('9')} />
        <Button text="÷" onClick={() => onButtonClick('÷')} className="operator" />
      </div>
      
      <div className="button-row">
        <Button text="4" onClick={() => onButtonClick('4')} />
        <Button text="5" onClick={() => onButtonClick('5')} />
        <Button text="6" onClick={() => onButtonClick('6')} />
        <Button text="×" onClick={() => onButtonClick('×')} className="operator" />
      </div>
      
      <div className="button-row">
        <Button text="1" onClick={() => onButtonClick('1')} />
        <Button text="2" onClick={() => onButtonClick('2')} />
        <Button text="3" onClick={() => onButtonClick('3')} />
        <Button text="−" onClick={() => onButtonClick('−')} className="operator" />
      </div>
      
      <div className="button-row">
        <Button text="0" onClick={() => onButtonClick('0')} />
        <Button text="." onClick={() => onButtonClick('.')} />
        <Button text="=" onClick={() => onButtonClick('=')} className="equals" />
        <Button text="+" onClick={() => onButtonClick('+')} className="operator" />
      </div>
    </div>
  );
}