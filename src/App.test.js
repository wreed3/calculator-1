import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders calculator application', () => {
    render(<App />);
    const calculatorElement = screen.getByRole('main');
    expect(calculatorElement).toBeInTheDocument();
  });

  test('renders calculator mode selector', () => {
    render(<App />);
    // Test that mode selector is present
    expect(screen.getByText(/calculator/i)).toBeInTheDocument();
  });

  test('switches between calculator modes', () => {
    render(<App />);
    // Add tests for mode switching when we see the implementation
  });
});