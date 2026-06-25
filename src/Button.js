import React from 'react';
import './Button.css';

function Button({ name, clickHandler, className = '', wide = false }) {
  const buttonClass = `Button ${className} ${wide ? 'wide' : ''}`.trim();
  
  return (
    <button 
      className={buttonClass}
      onClick={() => clickHandler(name)}
    >
      {name}
    </button>
  );
}

export default Button;