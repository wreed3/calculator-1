import React, { Component } from 'react';
import Button from './Button';
import './ButtonPanel.css';

class ButtonPanel extends Component {
  handleClick = (buttonName) => {
    this.props.onButtonClick(buttonName);
  };

  render() {
    return (
      <div className="button-panel">
        {/* Row 1: Scientific functions */}
        <div className="button-row">
          <Button name="deg/rad" clickHandler={this.handleClick} className="function-button" />
          <Button name="sin" clickHandler={this.handleClick} className="function-button" />
          <Button name="cos" clickHandler={this.handleClick} className="function-button" />
          <Button name="tan" clickHandler={this.handleClick} className="function-button" />
          <Button name="^" clickHandler={this.handleClick} className="operator-button" />
        </div>

        {/* Row 2: Inverse trig & special functions */}
        <div className="button-row">
          <Button name="pi" clickHandler={this.handleClick} className="function-button" />
          <Button name="asin" clickHandler={this.handleClick} className="function-button" />
          <Button name="acos" clickHandler={this.handleClick} className="function-button" />
          <Button name="atan" clickHandler={this.handleClick} className="function-button" />
          <Button name="sqrt" clickHandler={this.handleClick} className="operator-button" />
        </div>

        {/* Row 3: Logarithms & powers */}
        <div className="button-row">
          <Button name="e" clickHandler={this.handleClick} className="function-button" />
          <Button name="log" clickHandler={this.handleClick} className="function-button" />
          <Button name="ln" clickHandler={this.handleClick} className="function-button" />
          <Button name="square" clickHandler={this.handleClick} className="function-button" />
          <Button name="cube" clickHandler={this.handleClick} className="function-button" />
        </div>

        {/* Row 4: Memory & special operations */}
        <div className="button-row">
          <Button name="MC" clickHandler={this.handleClick} className="memory-button" />
          <Button name="MR" clickHandler={this.handleClick} className="memory-button" />
          <Button name="M+" clickHandler={this.handleClick} className="memory-button" />
          <Button name="M-" clickHandler={this.handleClick} className="memory-button" />
          <Button name="mod" clickHandler={this.handleClick} className="operator-button" />
        </div>

        {/* Row 5: Additional functions */}
        <div className="button-row">
          <Button name="AC" clickHandler={this.handleClick} className="clear-button" />
          <Button name="1/x" clickHandler={this.handleClick} className="function-button" />
          <Button name="abs" clickHandler={this.handleClick} className="function-button" />
          <Button name="factorial" clickHandler={this.handleClick} className="function-button" />
          <Button name="÷" clickHandler={this.handleClick} className="operator-button" />
        </div>

        {/* Row 6: Numbers 7-9 */}
        <div className="button-row">
          <Button name="7" clickHandler={this.handleClick} />
          <Button name="8" clickHandler={this.handleClick} />
          <Button name="9" clickHandler={this.handleClick} />
          <Button name="×" clickHandler={this.handleClick} className="operator-button" />
          <Button name="exp" clickHandler={this.handleClick} className="function-button" />
        </div>

        {/* Row 7: Numbers 4-6 */}
        <div className="button-row">
          <Button name="4" clickHandler={this.handleClick} />
          <Button name="5" clickHandler={this.handleClick} />
          <Button name="6" clickHandler={this.handleClick} />
          <Button name="-" clickHandler={this.handleClick} className="operator-button" />
          <Button name="C" clickHandler={this.handleClick} className="clear-button" />
        </div>

        {/* Row 8: Numbers 1-3 */}
        <div className="button-row">
          <Button name="1" clickHandler={this.handleClick} />
          <Button name="2" clickHandler={this.handleClick} />
          <Button name="3" clickHandler={this.handleClick} />
          <Button name="+" clickHandler={this.handleClick} className="operator-button" />
          <Button name="+/-" clickHandler={this.handleClick} className="function-button" />
        </div>

        {/* Row 9: Bottom row */}
        <div className="button-row">
          <Button name="0" clickHandler={this.handleClick} className="zero-button" />
          <Button name="." clickHandler={this.handleClick} />
          <Button name="%" clickHandler={this.handleClick} className="function-button" />
          <Button name="=" clickHandler={this.handleClick} className="equals-button" />
        </div>
      </div>
    );
  }
}

export default ButtonPanel;