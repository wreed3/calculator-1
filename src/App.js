import './App.css';
import Calculator from './Calculator';
import ProgrammerCalculator from './ProgrammerCalculator';
import UnitConverter from './UnitConverter';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('unit'); // 'basic', 'programmer', or 'unit'

  return (
    <div className="App">
      <div className="calculator-container">
        <div className="mode-switcher">
          <button 
            className={`mode-button ${mode === 'basic' ? 'active' : ''}`}
            onClick={() => setMode('basic')}
          >
            Basic
          </button>
          <button 
            className={`mode-button ${mode === 'programmer' ? 'active' : ''}`}
            onClick={() => setMode('programmer')}
          >
            Programmer
          </button>
          <button 
            className={`mode-button ${mode === 'unit' ? 'active' : ''}`}
            onClick={() => setMode('unit')}
          >
            Unit Converter
          </button>
        </div>
        {mode === 'basic' && <Calculator />}
        {mode === 'programmer' && <ProgrammerCalculator />}
        {mode === 'unit' && <UnitConverter />}
      </div>
    </div>
  );
}

export default App;