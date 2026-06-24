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

  test('applies default button class', () => {
    const { container } = render(<Button name="1" clickHandler={() => {}} />);
    expect(container.firstChild).toHaveClass('button');
  });

  test('applies custom className', () => {
    const { container } = render(<Button name="+" clickHandler={() => {}} className="operator" />);
    expect(container.firstChild).toHaveClass('operator');
  });

  test('applies wide class for wide buttons', () => {
    const { container } = render(<Button name="0" clickHandler={() => {}} wide={true} />);
    expect(container.firstChild).toHaveClass('wide');
  });

  test('renders operator buttons', () => {
    const operators = ['+', '-', '×', '÷'];
    operators.forEach(op => {
      const { unmount } = render(<Button name={op} clickHandler={() => {}} />);
      expect(screen.getByText(op)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders function buttons', () => {
    const functions = ['AC', '%', '+/-', '='];
    functions.forEach(fn => {
      const { unmount } = render(<Button name={fn} clickHandler={() => {}} />);
      expect(screen.getByText(fn)).toBeInTheDocument();
      unmount();
    });
  });

  test('handles multiple clicks', () => {
    const handleClick = jest.fn();
    render(<Button name="5" clickHandler={handleClick} />);
    const button = screen.getByText('5');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  test('renders with different button types', () => {
    const { unmount: unmount1 } = render(<Button name="5" clickHandler={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    unmount1();

    const { unmount: unmount2 } = render(<Button name="AC" clickHandler={() => {}} />);
    expect(screen.getByText('AC')).toBeInTheDocument();
    unmount2();

    render(<Button name="=" clickHandler={() => {}} />);
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  test('button is clickable', () => {
    const handleClick = jest.fn();
    render(<Button name="9" clickHandler={handleClick} />);
    const button = screen.getByText('9');
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});