# Scientific Calculator App

A full-featured scientific calculator built with React, supporting trigonometric functions, logarithms, exponentials, and advanced mathematical operations.

## Features

### Basic Operations
- Addition (+)
- Subtraction (−)
- Multiplication (×)
- Division (÷)

### Scientific Functions
- **Trigonometric**: sin, cos, tan (with degree/radian mode toggle)
- **Logarithmic**: log (base 10), ln (natural logarithm)
- **Exponential**: eˣ, xʸ (power function)
- **Power functions**: x² (square), x³ (cube), √x (square root)
- **Other**: ! (factorial), 1/x (inverse)

### Constants
- π (pi - 3.14159...)
- e (Euler's number - 2.71828...)

### Memory Functions
- **MC**: Memory Clear - clears the memory
- **MR**: Memory Recall - recalls the value from memory
- **M+**: Memory Add - adds current display value to memory

### Additional Features
- **Angle Modes**: Toggle between DEG (degrees) and RAD (radians) for trigonometric functions
- **Memory Indicator**: Shows "M" in the display when memory contains a value
- **Keyboard Support**: Use number keys, operators, Enter for equals, and Escape to clear
- **Error Handling**: Displays "Error" for invalid operations (e.g., division by zero, negative square roots)

## Usage Examples

### Basic Calculation
1. Enter numbers using the number pad
2. Press an operator (+, −, ×, ÷)
3. Enter the second number
4. Press = to see the result

### Scientific Operations
1. Enter a number
2. Press a scientific function button (e.g., sin, log, √)
3. The result is displayed immediately

### Power Function (xʸ)
1. Enter the base number
2. Press xʸ
3. Enter the exponent
4. Press = to calculate

### Memory Operations
1. Calculate or enter a value
2. Press M+ to store it in memory
3. Perform other calculations
4. Press MR to recall the stored value
5. Press MC to clear memory

### Angle Mode
- Click the DEG/RAD button to toggle between degrees and radians
- This affects sin, cos, and tan calculations
- Example: sin(90) in DEG mode = 1, sin(90) in RAD mode ≈ 0.894

## Keyboard Shortcuts

- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Decimal**: .
- **Calculate**: Enter
- **Clear**: Escape

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

The page will reload when you make changes. You may also see any lint errors in the console.

### Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Application styling
├── Calculator.js       # Calculator logic and state management
├── Display.js          # Display component showing values and indicators
├── Display.css         # Display styling
├── ButtonPanel.js      # Button layout and organization
├── ButtonPanel.css     # Button panel styling
├── Button.js           # Individual button component
└── Button.css          # Button styling with variants
```

## Technical Details

### State Management
The calculator uses React class component state to manage:
- Display value
- Previous value for operations
- Current operation
- Angle mode (degrees/radians)
- Memory storage
- Waiting for operand flag

### Error Handling
The calculator handles various error cases:
- Division by zero
- Invalid mathematical operations (e.g., square root of negative numbers)
- Factorial overflow (values > 170)
- NaN and Infinity results

### Precision
- Results are formatted to 12 significant digits to prevent display overflow
- Large factorial results return Infinity for values > 170

## Browser Support

This calculator works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- React 18+

## License

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)