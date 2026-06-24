import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  describe('Display', () => {
    test('renders initial display value of 0', () => {
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0');
    });

    test('updates display when number button is clicked', () => {
      const button5 = screen.getByText('5');
      fireEvent.click(button5);
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    test('displays multiple digits correctly', () => {
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('3'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('123');
    });
  });

  describe('Basic Arithmetic Operations', () => {
    test('performs addition correctly', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('8');
    });

    test('performs subtraction correctly', () => {
      fireEvent.click(screen.getByText('9'));
      fireEvent.click(screen.getByText('-'));
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    test('performs multiplication correctly', () => {
      fireEvent.click(screen.getByText('6'));
      fireEvent.click(screen.getByText('×'));
      fireEvent.click(screen.getByText('7'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('42');
    });

    test('performs division correctly', () => {
      fireEvent.click(screen.getByText('8'));
      fireEvent.click(screen.getByText('÷'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('4');
    });
  });

  describe('Chained Operations', () => {
    test('chains multiple additions', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('10');
    });

    test('chains mixed operations', () => {
      fireEvent.click(screen.getByText('10'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('×'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('30');
    });
  });

  describe('Decimal Operations', () => {
    test('handles decimal point input', () => {
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('4'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('3.14');
    });

    test('prevents multiple decimal points', () => {
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('4'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('3.14');
    });

    test('performs operations with decimals', () => {
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('4');
    });
  });

  describe('Special Functions', () => {
    test('clears display with AC button', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('AC'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0');
    });

    test('toggles sign with +/- button', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+/-'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('-5');
    });

    test('toggles sign back to positive', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+/-'));
      fireEvent.click(screen.getByText('+/-'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    test('calculates percentage', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('%'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0.5');
    });
  });

  describe('Edge Cases', () => {
    test('handles division by zero', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('÷'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent(/error|infinity/i);
    });

    test('handles starting with decimal point', () => {
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('5'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0.5');
    });

    test('clears state after calculation and new number', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('='));
      fireEvent.click(screen.getByText('2'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('2');
    });

    test('continues calculation after equals', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('='));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('10');
    });
  });

  describe('Zero Handling', () => {
    test('replaces leading zero when digit is entered', () => {
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('5'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    test('allows zero after decimal point', () => {
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('0'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('1.0');
    });
  });
});