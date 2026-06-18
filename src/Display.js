import React from 'react';
import './Display.css';

export default function Display({ value, angleMode, hasMemory }) {
  return (
    <div className="display-container">
      <div className="display-info">
        <span className="angle-mode">{angleMode.toUpperCase()}</span>
        {hasMemory && <span className="memory-indicator">M</span>}
      </div>
      <div className="display-value">{value}</div>
    </div>
  );
}