import { render, screen, fireEvent } from '@testing-library/react';
import ButtonPanel from './ButtonPanel';

describe('ButtonPanel Component', () => {
  test('renders all number buttons 0-9', () => {
    render(<ButtonPanel clickHandler={() => {}} />);
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  test('renders all operator buttons', () => {
    render(<ButtonPanel clickHandler={() => {}} />);
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
  });

  test('renders function buttons', () => {
    render(<ButtonPanel clickHandler={() => {}} />);
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('+/-')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  test('renders decimal point button', () => {
    render(<ButtonPanel clickHandler={() => {}} />);
    expect(screen.getByText('.')).toBeInTheDocument();
  });

  test('passes click events to handler for numbers', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('5'));
    expect(handleClick).toHaveBeenCalledWith('5');
  });

  test('handles operator button clicks', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('+'));
    expect(handleClick).toHaveBeenCalledWith('+');
  });

  test('handles function button clicks', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('AC'));
    expect(handleClick).toHaveBeenCalledWith('AC');
  });

  test('applies correct CSS class', () => {
    const { container } = render(<ButtonPanel clickHandler={() => {}} />);
    expect(container.firstChild).toHaveClass('button-panel');
  });

  test('handles decimal button click', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('.'));
    expect(handleClick).toHaveBeenCalledWith('.');
  });

  test('handles percentage button click', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('%'));
    expect(handleClick).toHaveBeenCalledWith('%');
  });

  test('handles sign toggle button click', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('+/-'));
    expect(handleClick).toHaveBeenCalledWith('+/-');
  });

  test('handles equals button click', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    fireEvent.click(screen.getByText('='));
    expect(handleClick).toHaveBeenCalledWith('=');
  });

  test('all buttons are clickable', () => {
    const handleClick = jest.fn();
    render(<ButtonPanel clickHandler={handleClick} />);
    
    const allButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                        '+', '-', '×', '÷', 'AC', '+/-', '%', '=', '.'];
    
    allButtons.forEach(buttonName => {
      const button = screen.getByText(buttonName);
      expect(button).toBeEnabled();
    });
  });
});