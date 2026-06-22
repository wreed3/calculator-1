import React, { Component } from 'react';
import './UnitConverter.css';

export default class UnitConverter extends Component {
  state = {
    category: 'length',
    fromUnit: 'meter',
    toUnit: 'foot',
    fromValue: '1',
    toValue: '3.28084'
  };

  // Conversion factors to base unit
  conversions = {
    length: {
      base: 'meter',
      units: {
        meter: { factor: 1, label: 'Meters (m)' },
        kilometer: { factor: 0.001, label: 'Kilometers (km)' },
        centimeter: { factor: 100, label: 'Centimeters (cm)' },
        millimeter: { factor: 1000, label: 'Millimeters (mm)' },
        mile: { factor: 0.000621371, label: 'Miles (mi)' },
        yard: { factor: 1.09361, label: 'Yards (yd)' },
        foot: { factor: 3.28084, label: 'Feet (ft)' },
        inch: { factor: 39.3701, label: 'Inches (in)' }
      }
    },
    weight: {
      base: 'kilogram',
      units: {
        kilogram: { factor: 1, label: 'Kilograms (kg)' },
        gram: { factor: 1000, label: 'Grams (g)' },
        milligram: { factor: 1000000, label: 'Milligrams (mg)' },
        ton: { factor: 0.001, label: 'Metric Tons (t)' },
        pound: { factor: 2.20462, label: 'Pounds (lb)' },
        ounce: { factor: 35.274, label: 'Ounces (oz)' }
      }
    },
    temperature: {
      base: 'celsius',
      units: {
        celsius: { label: 'Celsius (°C)', special: true },
        fahrenheit: { label: 'Fahrenheit (°F)', special: true },
        kelvin: { label: 'Kelvin (K)', special: true }
      }
    },
    volume: {
      base: 'liter',
      units: {
        liter: { factor: 1, label: 'Liters (L)' },
        milliliter: { factor: 1000, label: 'Milliliters (mL)' },
        cubicMeter: { factor: 0.001, label: 'Cubic Meters (m³)' },
        gallon: { factor: 0.264172, label: 'Gallons (gal)' },
        quart: { factor: 1.05669, label: 'Quarts (qt)' },
        pint: { factor: 2.11338, label: 'Pints (pt)' },
        cup: { factor: 4.22675, label: 'Cups' },
        fluidOunce: { factor: 33.814, label: 'Fluid Ounces (fl oz)' }
      }
    },
    area: {
      base: 'squareMeter',
      units: {
        squareMeter: { factor: 1, label: 'Square Meters (m²)' },
        squareKilometer: { factor: 0.000001, label: 'Square Kilometers (km²)' },
        squareCentimeter: { factor: 10000, label: 'Square Centimeters (cm²)' },
        hectare: { factor: 0.0001, label: 'Hectares (ha)' },
        acre: { factor: 0.000247105, label: 'Acres' },
        squareMile: { factor: 3.861e-7, label: 'Square Miles (mi²)' },
        squareYard: { factor: 1.19599, label: 'Square Yards (yd²)' },
        squareFoot: { factor: 10.7639, label: 'Square Feet (ft²)' }
      }
    },
    speed: {
      base: 'meterPerSecond',
      units: {
        meterPerSecond: { factor: 1, label: 'Meters/Second (m/s)' },
        kilometerPerHour: { factor: 3.6, label: 'Kilometers/Hour (km/h)' },
        milePerHour: { factor: 2.23694, label: 'Miles/Hour (mph)' },
        knot: { factor: 1.94384, label: 'Knots (kn)' },
        footPerSecond: { factor: 3.28084, label: 'Feet/Second (ft/s)' }
      }
    },
    time: {
      base: 'second',
      units: {
        second: { factor: 1, label: 'Seconds (s)' },
        minute: { factor: 1/60, label: 'Minutes (min)' },
        hour: { factor: 1/3600, label: 'Hours (h)' },
        day: { factor: 1/86400, label: 'Days' },
        week: { factor: 1/604800, label: 'Weeks' },
        month: { factor: 1/2628000, label: 'Months (30 days)' },
        year: { factor: 1/31536000, label: 'Years (365 days)' }
      }
    }
  };

  categories = {
    length: 'Length',
    weight: 'Weight',
    temperature: 'Temperature',
    volume: 'Volume',
    area: 'Area',
    speed: 'Speed',
    time: 'Time'
  };

  convertTemperature = (value, fromUnit, toUnit) => {
    let celsius;
    
    // Convert to Celsius first
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target
    switch (toUnit) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  convert = (value, fromUnit, toUnit, category) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';

    // Special handling for temperature
    if (category === 'temperature') {
      return this.convertTemperature(num, fromUnit, toUnit).toFixed(6);
    }

    // Standard conversion through base unit
    const categoryData = this.conversions[category];
    const fromFactor = categoryData.units[fromUnit].factor;
    const toFactor = categoryData.units[toUnit].factor;

    // Convert to base unit, then to target unit
    const baseValue = num / fromFactor;
    const result = baseValue * toFactor;

    return result.toFixed(6);
  };

  handleCategoryChange = (e) => {
    const category = e.target.value;
    const units = Object.keys(this.conversions[category].units);
    const fromUnit = units[0];
    const toUnit = units[1] || units[0];

    this.setState({
      category,
      fromUnit,
      toUnit,
      fromValue: '1'
    }, () => {
      const toValue = this.convert('1', fromUnit, toUnit, category);
      this.setState({ toValue });
    });
  };

  handleFromUnitChange = (e) => {
    const fromUnit = e.target.value;
    const { fromValue, toUnit, category } = this.state;
    const toValue = this.convert(fromValue, fromUnit, toUnit, category);
    
    this.setState({ fromUnit, toValue });
  };

  handleToUnitChange = (e) => {
    const toUnit = e.target.value;
    const { fromValue, fromUnit, category } = this.state;
    const toValue = this.convert(fromValue, fromUnit, toUnit, category);
    
    this.setState({ toUnit, toValue });
  };

  handleFromValueChange = (e) => {
    const fromValue = e.target.value;
    const { fromUnit, toUnit, category } = this.state;
    
    if (fromValue === '' || fromValue === '-') {
      this.setState({ fromValue, toValue: '0' });
      return;
    }

    const toValue = this.convert(fromValue, fromUnit, toUnit, category);
    this.setState({ fromValue, toValue });
  };

  handleToValueChange = (e) => {
    const toValue = e.target.value;
    const { fromUnit, toUnit, category } = this.state;
    
    if (toValue === '' || toValue === '-') {
      this.setState({ toValue, fromValue: '0' });
      return;
    }

    const fromValue = this.convert(toValue, toUnit, fromUnit, category);
    this.setState({ toValue, fromValue });
  };

  handleSwap = () => {
    const { fromUnit, toUnit, fromValue, toValue } = this.state;
    this.setState({
      fromUnit: toUnit,
      toUnit: fromUnit,
      fromValue: toValue,
      toValue: fromValue
    });
  };

  handleClear = () => {
    this.setState({
      fromValue: '0',
      toValue: '0'
    });
  };

  render() {
    const { category, fromUnit, toUnit, fromValue, toValue } = this.state;
    const units = this.conversions[category].units;

    return (
      <div className="unit-converter">
        <div className="converter-header">
          <h2>Unit Converter</h2>
          <select 
            className="category-select"
            value={category}
            onChange={this.handleCategoryChange}
          >
            {Object.entries(this.categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="conversion-panel">
          <div className="conversion-group">
            <label>From</label>
            <select 
              className="unit-select"
              value={fromUnit}
              onChange={this.handleFromUnitChange}
            >
              {Object.entries(units).map(([key, data]) => (
                <option key={key} value={key}>{data.label}</option>
              ))}
            </select>
            <input
              type="number"
              className="value-input"
              value={fromValue}
              onChange={this.handleFromValueChange}
              placeholder="Enter value"
            />
          </div>

          <div className="swap-button-container">
            <button className="swap-button" onClick={this.handleSwap}>
              ⇅
            </button>
          </div>

          <div className="conversion-group">
            <label>To</label>
            <select 
              className="unit-select"
              value={toUnit}
              onChange={this.handleToUnitChange}
            >
              {Object.entries(units).map(([key, data]) => (
                <option key={key} value={key}>{data.label}</option>
              ))}
            </select>
            <input
              type="number"
              className="value-input"
              value={toValue}
              onChange={this.handleToValueChange}
              placeholder="Result"
            />
          </div>
        </div>

        <div className="converter-footer">
          <button className="clear-button" onClick={this.handleClear}>
            Clear
          </button>
        </div>

        <div className="conversion-formula">
          <p>
            {parseFloat(fromValue).toFixed(2)} {units[fromUnit].label} = {parseFloat(toValue).toFixed(6)} {units[toUnit].label}
          </p>
        </div>
      </div>
    );
  }
}