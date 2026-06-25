import React from 'react';
import Button from './Button';
import './ButtonPanel.css';

function ButtonPanel({ clickHandler }) {
  return (
    <div className="ButtonPanel">
      <Button name="AC" clickHandler={clickHandler} className="function" />
      <Button name="±" clickHandler={clickHandler} className="function" />
      <Button name="%" clickHandler={clickHandler} className="function" />
      <Button name="÷" clickHandler={clickHandler} className="operator" />
      
      <Button name="7" clickHandler={clickHandler} />
      <Button name="8" clickHandler={clickHandler} />
      <Button name="9" clickHandler={clickHandler} />
      <Button name="×" clickHandler={clickHandler} className="operator" />
      
      <Button name="4" clickHandler={clickHandler} />
      <Button name="5" clickHandler={clickHandler} />
      <Button name="6" clickHandler={clickHandler} />
      <Button name="-" clickHandler={clickHandler} className="operator" />
      
      <Button name="1" clickHandler={clickHandler} />
      <Button name="2" clickHandler={clickHandler} />
      <Button name="3" clickHandler={clickHandler} />
      <Button name="+" clickHandler={clickHandler} className="operator" />
      
      <Button name="0" clickHandler={clickHandler} wide={true} />
      <Button name="." clickHandler={clickHandler} />
      <Button name="=" clickHandler={clickHandler} className="operator" />
    </div>
  );
}

export default ButtonPanel;