import { render, screen } from '@testing-library/react';
import ProgrammerDisplay from './ProgrammerDisplay';

describe('ProgrammerDisplay Component', () => {
  test('renders decimal value', () => {
    render(<ProgrammerDisplay value={42} mode="DEC" />);
    expect(screen.getByTestId('display')).toHaveTextContent('42');
  });

  test('renders binary value', () => {
    render(<ProgrammerDisplay value={5} mode="BIN" />);
    expect(screen.getByTestId('display')).toHaveTextContent('101');
  });

  test('renders hexadecimal value', () => {
    render(<ProgrammerDisplay value={255} mode="HEX" />);
    expect(screen.getByTestId('display')).toHaveTextContent('FF');
  });

  test('renders octal value', () => {
    render(<ProgrammerDisplay value={8} mode="OCT" />);
    expect(screen.getByTestId('display')).toHaveTextContent('10');
  });

  test('shows all representations', () => {
    render(<ProgrammerDisplay value={10} mode="DEC" showAll={true} />);
    expect(screen.getByTestId('binary-display')).toHaveTextContent('1010');
    expect(screen.getByTestId('octal-display')).toHaveTextContent('12');
    expect(screen.getByTestId('decimal-display')).toHaveTextContent('10');
    expect(screen.getByTestId('hex-display')).toHaveTextContent('A');
  });

  test('handles zero value', () => {
    render(<ProgrammerDisplay value={0} mode="DEC" />);
    expect(screen.getByTestId('display')).toHaveTextContent('0');
  });

  test('handles negative values', () => {
    render(<ProgrammerDisplay value={-5} mode="DEC" />);
    expect(screen.getByTestId('display')).toHaveTextContent('-5');
  });
});