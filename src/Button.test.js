import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with name', () => {
    render(<Button name="5" clickHandler={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls clickHandler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button name="7" clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('7'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('passes button name to clickHandler', () => {
    const handleClick = jest.fn();
    render(<Button name="+" clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('+'));
    expect(handleClick).toHaveBeenCalledWith('+');
  });

  test('applies default className', () => {
    render(<Button name="1" clickHandler={() => {}} />);
    const button = screen.getByText('1');
    expect(button).toHaveClass('button');
  });

  test('applies custom className', () => {
    render(<Button name="+" clickHandler={() => {}} className="operator" />);
    const button = screen.getByText('+');
    expect(button).toHaveClass('operator');
  });

  test('applies wide class for wide buttons', () => {
    render(<Button name="0" clickHandler={() => {}} wide={true} />);
    const button = screen.getByText('0');
    expect(button).toHaveClass('wide');
  });

  test('renders operator buttons', () => {
    const operators = ['+', '-', '×', '÷'];
    operators.forEach(op => {
      render(<Button name={op} clickHandler={() => {}} />);
      expect(screen.getByText(op)).toBeInTheDocument();
    });
  });

  test('renders function buttons', () => {
    const functions = ['AC', '%', '+/-', '='];
    functions.forEach(fn => {
      render(<Button name={fn} clickHandler={() => {}} />);
      expect(screen.getByText(fn)).toBeInTheDocument();
    });
  });

  test('handles multiple clicks', () => {
    const handleClick = jest.fn();
    render(<Button name="2" clickHandler={handleClick} />);
    const button = screen.getByText('2');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  test('button is accessible', () => {
    render(<Button name="3" clickHandler={() => {}} />);
    const button = screen.getByText('3');
    expect(button.tagName).toBe('BUTTON');
  });
});