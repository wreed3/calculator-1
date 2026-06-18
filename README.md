# Scientific Calculator App

A full-featured scientific calculator built with React, supporting trigonometric functions, logarithms, exponentials, and advanced mathematical operations.

## Features

### Basic Operations
- Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- Decimal point support
- Percentage calculations
- Clear (AC) and Clear Entry (CE) functions

### Scientific Functions
- **Trigonometric**: sin, cos, tan (with degree/radian mode toggle)
- **Logarithmic**: log (base 10), ln (natural log)
- **Exponential**: eˣ, xʸ (power)
- **Power functions**: x² (square), x³ (cube), √x (square root)
- **Other**: ! (factorial), 1/x (inverse)

### Constants
- π (pi): 3.14159...
- e (Euler's number): 2.71828...

### Memory Functions
- **MC** (Memory Clear): Clear the stored memory value
- **MR** (Memory Recall): Recall the stored memory value
- **M+** (Memory Add): Add current display value to memory

### Additional Features
- **Angle Mode Toggle**: Switch between degrees (DEG) and radians (RAD)
- **Memory Indicator**: Shows "M" when a value is stored in memory
- **Error Handling**: Displays "Error" for invalid operations
- **Keyboard Support**: Use number keys, operators, Enter (=), and Escape (AC)

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

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes. You may also see any lint errors in the console.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Usage Guide

### Basic Calculations
1. Enter numbers using the number pad or keyboard
2. Click an operator (+, −, ×, ÷)
3. Enter the second number
4. Press = or Enter to see the result

### Scientific Functions
1. Enter a number
2. Click a scientific function button (sin, cos, log, etc.)
3. The result is displayed immediately

### Power Operations (xʸ)
1. Enter the base number
2. Click the xʸ button
3. Enter the exponent
4. Press = to calculate

### Memory Operations
1. Calculate or enter a value
2. Press M+ to add it to memory
3. Press MR to recall the stored value
4. Press MC to clear memory

### Angle Mode
- Click the DEG/RAD button to toggle between degree and radian modes
- This affects trigonometric functions (sin, cos, tan)

### Keyboard Shortcuts
- **Numbers**: 0-9
- **Operators**: +, -, *, /
- **Decimal**: .
- **Equals**: Enter
- **Clear**: Escape

## Technology Stack

- **React** 18.1.0: UI framework
- **Create React App**: Build tooling
- **CSS3**: Styling with flexbox and animations

## Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Application styling
├── Calculator.js       # Calculator logic and state management
├── Display.js          # Display component with mode indicators
├── Display.css         # Display styling
├── ButtonPanel.js      # Button layout and grid
├── ButtonPanel.css     # Button panel styling
├── Button.js           # Individual button component
├── Button.css          # Button styling
└── index.js           # Application entry point
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)