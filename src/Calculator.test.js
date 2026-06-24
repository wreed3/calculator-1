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
      fireEvent.click(screen.getByText('5'));
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

    test('does not add leading zeros', () => {
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('5'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
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

    test('handles division by zero', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('÷'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent(/Error|Infinity/);
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
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('×'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('16');
    });
  });

  describe('Decimal Operations', () => {
    test('adds decimal point', () => {
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

    test('handles decimal arithmetic', () => {
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('.'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent(/0\.3/);
    });
  });

  describe('Clear Function', () => {
    test('clears display with AC button', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('AC'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0');
    });

    test('clears operation state', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('AC'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('2');
    });
  });

  describe('Percentage Function', () => {
    test('calculates percentage', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('%'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0.5');
    });

    test('uses percentage in calculation', () => {
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('%'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('220');
    });
  });

  describe('Sign Toggle', () => {
    test('toggles positive to negative', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+/-'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('-5');
    });

    test('toggles negative to positive', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+/-'));
      fireEvent.click(screen.getByText('+/-'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    test('works with zero', () => {
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('+/-'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('0');
    });
  });

  describe('Edge Cases', () => {
    test('handles pressing equals without operation', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('='));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('5');
    });

    test('handles pressing operation immediately after equals', () => {
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

    test('starts new number after equals', () => {
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('='));
      fireEvent.click(screen.getByText('7'));
      const display = screen.getByTestId('display');
      expect(display).toHaveTextContent('7');
    });
  });
});