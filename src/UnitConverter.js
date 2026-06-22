import React, { useState } from 'react';
import './UnitConverter.css';

function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const conversions = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      kilometers: 0.001,
      miles: 0.000621371,
      centimeters: 100
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      ounces: 35.274,
      grams: 1000,
      tons: 0.001
    },
    temperature: {
      celsius: 'c',
      fahrenheit: 'f',
      kelvin: 'k'
    }
  };

  const handleConvert = () => {
    if (!inputValue) return;
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    if (category === 'temperature') {
      const converted = convertTemperature(value, fromUnit, toUnit);
      setResult(converted.toFixed(2));
    } else {
      const baseValue = value / conversions[category][fromUnit];
      const converted = baseValue * conversions[category][toUnit];
      setResult(converted.toFixed(4));
    }
  };

  const convertTemperature = (value, from, to) => {
    let celsius;
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
    else celsius = value - 273.15;

    if (to === 'celsius') return celsius;
    else if (to === 'fahrenheit') return celsius * 9/5 + 32;
    else return celsius + 273.15;
  };

  return (
    <div className="unit-converter">
      <h2>Unit Converter</h2>
      
      <div className="category-selector">
        <button 
          className={category === 'length' ? 'active' : ''}
          onClick={() => setCategory('length')}
        >
          Length
        </button>
        <button 
          className={category === 'weight' ? 'active' : ''}
          onClick={() => setCategory('weight')}
        >
          Weight
        </button>
        <button 
          className={category === 'temperature' ? 'active' : ''}
          onClick={() => setCategory('temperature')}
        >
          Temperature
        </button>
      </div>

      <div className="converter-section">
        <div className="input-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {Object.keys(conversions[category]).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div className="convert-arrow">→</div>

        <div className="input-group">
          <input
            type="text"
            value={result}
            readOnly
            placeholder="Result"
          />
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(conversions[category]).map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="convert-btn" onClick={handleConvert}>
        Convert
      </button>
    </div>
  );
}

export default UnitConverter;