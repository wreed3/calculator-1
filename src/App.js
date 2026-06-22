import './App.css';
import Calculator from './Calculator';
import ProgrammerCalculator from './ProgrammerCalculator';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('programmer'); // 'basic' or 'programmer'

  return (
    <div className="App">
      <div className="calculator-container">
        <div className="mode-switcher">
          <button 
            className={`mode-button ${mode === 'basic' ? 'active' : ''}`}
            onClick={() => setMode('basic')}
          >
            Basic Calculator
          </button>
          <button 
            className={`mode-button ${mode === 'programmer' ? 'active' : ''}`}
            onClick={() => setMode('programmer')}
          >
            Programmer Calculator
          </button>
        </div>
        {mode === 'basic' ? <Calculator /> : <ProgrammerCalculator />}
      </div>
    </div>
  );
}

export default App;