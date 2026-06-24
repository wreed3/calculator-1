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
    const { container } = render(<Display value="100" />);
    expect(container.firstChild).toHaveClass('display');
  });

  test('handles string number values', () => {
    render(<Display value="456" />);
    expect(screen.getByTestId('display')).toHaveTextContent('456');
  });

  test('handles numeric values', () => {
    render(<Display value={789} />);
    expect(screen.getByTestId('display')).toHaveTextContent('789');
  });

  test('handles empty string', () => {
    render(<Display value="" />);
    const display = screen.getByTestId('display');
    expect(display).toBeInTheDocument();
  });

  test('handles very long numbers', () => {
    render(<Display value="12345678901234567890" />);
    expect(screen.getByTestId('display')).toBeInTheDocument();
  });

  test('handles scientific notation', () => {
    render(<Display value="1.23e+10" />);
    expect(screen.getByTestId('display')).toHaveTextContent('1.23e+10');
  });
});