import { render, screen, fireEvent } from '@testing-library/react';
import ProgrammerCalculator from './ProgrammerCalculator';

describe('ProgrammerCalculator Component', () => {
  beforeEach(() => {
    render(<ProgrammerCalculator />);
  });

  describe('Number System Conversions', () => {
    test('displays value in binary format', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('BIN'));
      expect(screen.getByTestId('binary-display')).toHaveTextContent('101');
    });

    test('displays value in hexadecimal format', () => {
      fireEvent.click(screen.getByText('15'));
      fireEvent.click(screen.getByText('HEX'));
      expect(screen.getByTestId('hex-display')).toHaveTextContent('F');
    });

    test('displays value in octal format', () => {
      fireEvent.click(screen.getByText('8'));
      fireEvent.click(screen.getByText('OCT'));
      expect(screen.getByTestId('octal-display')).toHaveTextContent('10');
    });

    test('displays value in decimal format', () => {
      fireEvent.click(screen.getByText('42'));
      fireEvent.click(screen.getByText('DEC'));
      expect(screen.getByTestId('decimal-display')).toHaveTextContent('42');
    });
  });

  describe('Bitwise Operations', () => {
    test('performs AND operation', () => {
      fireEvent.click(screen.getByText('12'));
      fireEvent.click(screen.getByText('AND'));
      fireEvent.click(screen.getByText('10'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByTestId('display')).toHaveTextContent('8');
    });

    test('performs OR operation', () => {
      fireEvent.click(screen.getByText('12'));
      fireEvent.click(screen.getByText('OR'));
      fireEvent.click(screen.getByText('10'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByTestId('display')).toHaveTextContent('14');
    });

    test('performs XOR operation', () => {
      fireEvent.click(screen.getByText('12'));
      fireEvent.click(screen.getByText('XOR'));
      fireEvent.click(screen.getByText('10'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByTestId('display')).toHaveTextContent('6');
    });

    test('performs NOT operation', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('NOT'));
      expect(screen.getByTestId('display')).toHaveTextContent('-6');
    });
  });

  describe('Bit Shift Operations', () => {
    test('performs left shift', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('<<'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByTestId('display')).toHaveTextContent('20');
    });

    test('performs right shift', () => {
      fireEvent.click(screen.getByText('20'));
      fireEvent.click(screen.getByText('>>'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByTestId('display')).toHaveTextContent('5');
    });
  });

  describe('Mode Switching', () => {
    test('switches between binary and decimal modes', () => {
      fireEvent.click(screen.getByText('BIN'));
      expect(screen.getByText('A')).toBeDisabled();
      fireEvent.click(screen.getByText('DEC'));
      expect(screen.getByText('A')).not.toBeDisabled();
    });

    test('disables invalid buttons in binary mode', () => {
      fireEvent.click(screen.getByText('BIN'));
      expect(screen.getByText('2')).toBeDisabled();
      expect(screen.getByText('9')).toBeDisabled();
    });

    test('disables invalid buttons in octal mode', () => {
      fireEvent.click(screen.getByText('OCT'));
      expect(screen.getByText('8')).toBeDisabled();
      expect(screen.getByText('9')).toBeDisabled();
    });
  });

  describe('Hexadecimal Input', () => {
    test('accepts A-F input in hex mode', () => {
      fireEvent.click(screen.getByText('HEX'));
      fireEvent.click(screen.getByText('A'));
      expect(screen.getByTestId('display')).toHaveTextContent('A');
    });

    test('converts hex to decimal', () => {
      fireEvent.click(screen.getByText('HEX'));
      fireEvent.click(screen.getByText('F'));
      fireEvent.click(screen.getByText('F'));
      fireEvent.click(screen.getByText('DEC'));
      expect(screen.getByTestId('display')).toHaveTextContent('255');
    });
  });
});