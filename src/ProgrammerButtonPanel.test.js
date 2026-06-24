import { render, screen, fireEvent } from '@testing-library/react';
import ProgrammerButtonPanel from './ProgrammerButtonPanel';

describe('ProgrammerButtonPanel Component', () => {
  test('renders number system mode buttons', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="DEC" />);
    expect(screen.getByText('BIN')).toBeInTheDocument();
    expect(screen.getByText('OCT')).toBeInTheDocument();
    expect(screen.getByText('DEC')).toBeInTheDocument();
    expect(screen.getByText('HEX')).toBeInTheDocument();
  });

  test('renders bitwise operation buttons', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="DEC" />);
    expect(screen.getByText('AND')).toBeInTheDocument();
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByText('XOR')).toBeInTheDocument();
    expect(screen.getByText('NOT')).toBeInTheDocument();
  });

  test('renders shift operation buttons', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="DEC" />);
    expect(screen.getByText('<<')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
  });

  test('renders hex digit buttons A-F', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="HEX" />);
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(letter => {
      expect(screen.getByText(letter)).toBeInTheDocument();
    });
  });

  test('disables hex buttons in decimal mode', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="DEC" />);
    expect(screen.getByText('A')).toBeDisabled();
  });

  test('enables hex buttons in hex mode', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="HEX" />);
    expect(screen.getByText('A')).not.toBeDisabled();
  });

  test('disables high digits in binary mode', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="BIN" />);
    expect(screen.getByText('2')).toBeDisabled();
    expect(screen.getByText('9')).toBeDisabled();
  });

  test('disables high digits in octal mode', () => {
    render(<ProgrammerButtonPanel clickHandler={() => {}} mode="OCT" />);
    expect(screen.getByText('8')).toBeDisabled();
    expect(screen.getByText('9')).toBeDisabled();
  });

  test('passes click events to handler', () => {
    const handleClick = jest.fn();
    render(<ProgrammerButtonPanel clickHandler={handleClick} mode="DEC" />);
    fireEvent.click(screen.getByText('AND'));
    expect(handleClick).toHaveBeenCalledWith('AND');
  });
});