import React, { useState } from 'react';
import './StatisticsCalculator.css';

function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState('');
  const [dataSet, setDataSet] = useState([]);
  const [results, setResults] = useState(null);

  const parseDataInput = (input) => {
    // Parse comma or space-separated numbers
    const numbers = input
      .split(/[,\s]+/)
      .map(str => str.trim())
      .filter(str => str !== '')
      .map(str => parseFloat(str))
      .filter(num => !isNaN(num));
    
    return numbers;
  };

  const handleAddData = () => {
    const numbers = parseDataInput(dataInput);
    if (numbers.length > 0) {
      setDataSet([...dataSet, ...numbers]);
      setDataInput('');
    }
  };

  const handleClearData = () => {
    setDataSet([]);
    setResults(null);
  };

  const handleRemoveLastValue = () => {
    if (dataSet.length > 0) {
      setDataSet(dataSet.slice(0, -1));
    }
  };

  const calculateMean = (data) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  };

  const calculateMedian = (data) => {
    if (data.length === 0) return 0;
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  };

  const calculateMode = (data) => {
    if (data.length === 0) return [];
    
    const frequency = {};
    data.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[key] === maxFreq)
      .map(key => parseFloat(key));
    
    return modes;
  };

  const calculateRange = (data) => {
    if (data.length === 0) return 0;
    return Math.max(...data) - Math.min(...data);
  };

  const calculateVariance = (data, isSample = true) => {
    if (data.length === 0) return 0;
    const mean = calculateMean(data);
    const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
    const sum = squaredDiffs.reduce((acc, val) => acc + val, 0);
    
    // Use n-1 for sample variance, n for population variance
    const divisor = isSample ? data.length - 1 : data.length;
    return divisor > 0 ? sum / divisor : 0;
  };

  const calculateStandardDeviation = (data, isSample = true) => {
    return Math.sqrt(calculateVariance(data, isSample));
  };

  const calculateQuartiles = (data) => {
    if (data.length === 0) return { q1: 0, q2: 0, q3: 0 };
    
    const sorted = [...data].sort((a, b) => a - b);
    const q2 = calculateMedian(sorted);
    
    const mid = Math.floor(sorted.length / 2);
    const lowerHalf = sorted.length % 2 === 0 
      ? sorted.slice(0, mid)
      : sorted.slice(0, mid);
    const upperHalf = sorted.length % 2 === 0
      ? sorted.slice(mid)
      : sorted.slice(mid + 1);
    
    const q1 = calculateMedian(lowerHalf);
    const q3 = calculateMedian(upperHalf);
    
    return { q1, q2, q3 };
  };

  const calculateIQR = (data) => {
    const { q1, q3 } = calculateQuartiles(data);
    return q3 - q1;
  };

  const calculateSum = (data) => {
    if (data.length === 0) return 0;
    return data.reduce((acc, val) => acc + val, 0);
  };

  const handleCalculate = () => {
    if (dataSet.length === 0) {
      alert('Please add data values first');
      return;
    }

    const mean = calculateMean(dataSet);
    const median = calculateMedian(dataSet);
    const mode = calculateMode(dataSet);
    const range = calculateRange(dataSet);
    const variance = calculateVariance(dataSet, true);
    const stdDev = calculateStandardDeviation(dataSet, true);
    const popVariance = calculateVariance(dataSet, false);
    const popStdDev = calculateStandardDeviation(dataSet, false);
    const quartiles = calculateQuartiles(dataSet);
    const iqr = calculateIQR(dataSet);
    const sum = calculateSum(dataSet);
    const min = Math.min(...dataSet);
    const max = Math.max(...dataSet);

    setResults({
      count: dataSet.length,
      sum,
      mean,
      median,
      mode,
      range,
      min,
      max,
      variance,
      stdDev,
      popVariance,
      popStdDev,
      quartiles,
      iqr
    });
  };

  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toFixed(4).replace(/\.?0+$/, '');
    }
    return num;
  };

  return (
    <div className="statistics-calculator">
      <h2>Statistics Calculator</h2>
      
      <div className="data-input-section">
        <div className="input-group">
          <input
            type="text"
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddData();
              }
            }}
            placeholder="Enter numbers (comma or space separated)"
            className="data-input"
          />
          <button onClick={handleAddData} className="btn-add">Add Data</button>
        </div>

        <div className="data-controls">
          <button onClick={handleRemoveLastValue} className="btn-control">
            Remove Last
          </button>
          <button onClick={handleClearData} className="btn-control">
            Clear All
          </button>
          <button onClick={handleCalculate} className="btn-calculate">
            Calculate
          </button>
        </div>
      </div>

      <div className="data-display-section">
        <h3>Data Set ({dataSet.length} values)</h3>
        <div className="data-values">
          {dataSet.length === 0 ? (
            <p className="empty-message">No data entered yet</p>
          ) : (
            <div className="values-list">
              {dataSet.map((value, index) => (
                <span key={index} className="value-chip">
                  {value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {results && (
        <div className="results-section">
          <h3>Statistical Results</h3>
          
          <div className="results-grid">
            <div className="result-group">
              <h4>Basic Statistics</h4>
              <div className="result-item">
                <span className="result-label">Count:</span>
                <span className="result-value">{results.count}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Sum:</span>
                <span className="result-value">{formatNumber(results.sum)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Mean (Average):</span>
                <span className="result-value">{formatNumber(results.mean)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Median:</span>
                <span className="result-value">{formatNumber(results.median)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Mode:</span>
                <span className="result-value">
                  {results.mode.length === results.count 
                    ? 'No mode' 
                    : results.mode.map(formatNumber).join(', ')}
                </span>
              </div>
            </div>

            <div className="result-group">
              <h4>Spread & Range</h4>
              <div className="result-item">
                <span className="result-label">Minimum:</span>
                <span className="result-value">{formatNumber(results.min)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Maximum:</span>
                <span className="result-value">{formatNumber(results.max)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Range:</span>
                <span className="result-value">{formatNumber(results.range)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Q1 (25th percentile):</span>
                <span className="result-value">{formatNumber(results.quartiles.q1)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Q2 (Median):</span>
                <span className="result-value">{formatNumber(results.quartiles.q2)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Q3 (75th percentile):</span>
                <span className="result-value">{formatNumber(results.quartiles.q3)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">IQR (Interquartile Range):</span>
                <span className="result-value">{formatNumber(results.iqr)}</span>
              </div>
            </div>

            <div className="result-group">
              <h4>Variability</h4>
              <div className="result-item">
                <span className="result-label">Sample Variance:</span>
                <span className="result-value">{formatNumber(results.variance)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Sample Std Dev:</span>
                <span className="result-value">{formatNumber(results.stdDev)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Population Variance:</span>
                <span className="result-value">{formatNumber(results.popVariance)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Population Std Dev:</span>
                <span className="result-value">{formatNumber(results.popStdDev)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsCalculator;