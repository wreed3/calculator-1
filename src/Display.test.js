import { render, screen } from '@testing-library/react';
import Display from './Display';

describe('Display Component', () => {
  test('renders display with value', () => {
    render(<Display value="123" />);
    expect(screen.getByTestId('display')).toHaveTextContent('123');
  });

  test('renders zero value', () => {
    render(<Display value="0" />);
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  test('renders negative values', () => {
    render(<Display value="-42" />);
    expect(screen.getByTestId('display')).toHaveTextContent('-42');
  });

  test('renders decimal values', () => {
    render(<Display value="3.14159" />);
    expect(screen.getByTestId('display')).toHaveTextContent('3.14159');
  });

  test('renders large numbers', () => {
    render(<Display value="123456789" />);
    expect(screen.getByTestId('display')).toHaveTextContent('123456789');
  });

  test('renders error messages', () => {
    render(<Display value="Error" />);
    expect(screen.getByTestId('display')).toHaveTextContent('Error');
  });

  test('applies correct CSS class', () => {
    render(<Display value="100" />);
    const display = screen.getByTestId('display');
    expect(display).toHaveClass('display');
  });

  test('handles string number values', () => {
    render(<Display value="456" />);
    expect(screen.getByTestId('display')).toHaveTextContent('456');
  });

  test('handles numeric values', () => {
    render(<Display value={789} />);
    expect(screen.getByTestId('display')).toHaveTextContent('789');
  });
});