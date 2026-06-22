import React, { Component } from 'react';
import './FinancialCalculator.css';

export default class FinancialCalculator extends Component {
  state = {
    mode: 'loan', // 'loan', 'investment', 'tip', 'discount', 'savings'
    
    // Loan calculator
    loanAmount: '200000',
    loanRate: '5',
    loanYears: '30',
    
    // Investment calculator
    initialInvestment: '10000',
    monthlyContribution: '500',
    investmentRate: '7',
    investmentYears: '20',
    
    // Tip calculator
    billAmount: '100',
    tipPercent: '15',
    numPeople: '1',
    
    // Discount calculator
    originalPrice: '100',
    discountPercent: '20',
    
    // Savings calculator
    targetAmount: '50000',
    currentSavings: '5000',
    monthlySavings: '500',
    savingsRate: '3'
  };

  formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  formatNumber = (value, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  // Loan/Mortgage Calculator
  calculateLoan = () => {
    const principal = parseFloat(this.state.loanAmount) || 0;
    const annualRate = parseFloat(this.state.loanRate) || 0;
    const years = parseFloat(this.state.loanYears) || 0;
    
    if (principal <= 0 || years <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }
    
    if (annualRate === 0) {
      const monthlyPayment = principal / (years * 12);
      return {
        monthlyPayment,
        totalPayment: principal,
        totalInterest: 0
      };
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    
    // Monthly payment formula: M = P * (r(1+r)^n) / ((1+r)^n - 1)
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    
    return { monthlyPayment, totalPayment, totalInterest };
  };

  // Investment Calculator (Compound Interest)
  calculateInvestment = () => {
    const principal = parseFloat(this.state.initialInvestment) || 0;
    const monthly = parseFloat(this.state.monthlyContribution) || 0;
    const annualRate = parseFloat(this.state.investmentRate) || 0;
    const years = parseFloat(this.state.investmentYears) || 0;
    
    if (years <= 0) {
      return { finalAmount: principal, totalContributions: principal, totalInterest: 0 };
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;
    
    // Future value of initial investment
    const futureValuePrincipal = principal * Math.pow(1 + monthlyRate, months);
    
    // Future value of monthly contributions (annuity)
    let futureValueContributions = 0;
    if (monthly > 0 && monthlyRate > 0) {
      futureValueContributions = monthly * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (monthly > 0) {
      futureValueContributions = monthly * months;
    }
    
    const finalAmount = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + (monthly * months);
    const totalInterest = finalAmount - totalContributions;
    
    return { finalAmount, totalContributions, totalInterest };
  };

  // Tip Calculator
  calculateTip = () => {
    const bill = parseFloat(this.state.billAmount) || 0;
    const tipPercent = parseFloat(this.state.tipPercent) || 0;
    const people = parseInt(this.state.numPeople) || 1;
    
    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    return { tipAmount, total, perPerson };
  };

  // Discount Calculator
  calculateDiscount = () => {
    const original = parseFloat(this.state.originalPrice) || 0;
    const discount = parseFloat(this.state.discountPercent) || 0;
    
    const discountAmount = original * (discount / 100);
    const finalPrice = original - discountAmount;
    
    return { discountAmount, finalPrice };
  };

  // Savings Goal Calculator
  calculateSavings = () => {
    const target = parseFloat(this.state.targetAmount) || 0;
    const current = parseFloat(this.state.currentSavings) || 0;
    const monthly = parseFloat(this.state.monthlySavings) || 0;
    const annualRate = parseFloat(this.state.savingsRate) || 0;
    
    const remaining = target - current;
    
    if (remaining <= 0) {
      return { monthsNeeded: 0, yearsNeeded: 0, totalContributions: 0 };
    }
    
    if (monthly <= 0) {
      return { monthsNeeded: Infinity, yearsNeeded: Infinity, totalContributions: 0 };
    }
    
    const monthlyRate = annualRate / 100 / 12;
    
    let monthsNeeded;
    if (monthlyRate === 0) {
      monthsNeeded = remaining / monthly;
    } else {
      // Using future value of annuity formula solved for n
      // FV = PMT * ((1 + r)^n - 1) / r
      // Solving for n: n = ln((FV * r / PMT) + 1) / ln(1 + r)
      monthsNeeded = Math.log((remaining * monthlyRate / monthly) + 1) / Math.log(1 + monthlyRate);
    }
    
    const yearsNeeded = monthsNeeded / 12;
    const totalContributions = monthly * monthsNeeded;
    
    return { monthsNeeded, yearsNeeded, totalContributions };
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  renderLoanCalculator = () => {
    const { monthlyPayment, totalPayment, totalInterest } = this.calculateLoan();
    
    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Loan Amount</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              value={this.state.loanAmount}
              onChange={(e) => this.handleInputChange('loanAmount', e.target.value)}
              placeholder="200000"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Annual Interest Rate</label>
          <div className="input-wrapper">
            <input
              type="number"
              step="0.01"
              value={this.state.loanRate}
              onChange={(e) => this.handleInputChange('loanRate', e.target.value)}
              placeholder="5"
            />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="input-group">
          <label>Loan Term</label>
          <div className="input-wrapper">
            <input
              type="number"
              value={this.state.loanYears}
              onChange={(e) => this.handleInputChange('loanYears', e.target.value)}
              placeholder="30"
            />
            <span className="input-suffix">years</span>
          </div>
        </div>

        <div className="results">
          <h3>Results</h3>
          <div className="result-row primary">
            <span>Monthly Payment</span>
            <span className="result-value">{this.formatCurrency(monthlyPayment)}</span>
          </div>
          <div className="result-row">
            <span>Total Payment</span>
            <span className="result-value">{this.formatCurrency(totalPayment)}</span>
          </div>
          <div className="result-row negative">
            <span>Total Interest</span>
            <span className="result-value">{this.formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </div>
    );
  };

  renderInvestmentCalculator = () => {
    const { finalAmount, totalContributions, totalInterest } = this.calculateInvestment();
    
    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Initial Investment</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              value={this.state.initialInvestment}
              onChange={(e) => this.handleInputChange('initialInvestment', e.target.value)}
              placeholder="10000"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Monthly Contribution</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              value={this.state.monthlyContribution}
              onChange={(e) => this.handleInputChange('monthlyContribution', e.target.value)}
              placeholder="500"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Expected Annual Return</label>
          <div className="input-wrapper">
            <input
              type="number"
              step="0.1"
              value={this.state.investmentRate}
              onChange={(e) => this.handleInputChange('investmentRate', e.target.value)}
              placeholder="7"
            />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="input-group">
          <label>Investment Period</label>
          <div className="input-wrapper">
            <input
              type="number"
              value={this.state.investmentYears}
              onChange={(e) => this.handleInputChange('investmentYears', e.target.value)}
              placeholder="20"
            />
            <span className="input-suffix">years</span>
          </div>
        </div>

        <div className="results">
          <h3>Results</h3>
          <div className="result-row primary">
            <span>Final Amount</span>
            <span className="result-value">{this.formatCurrency(finalAmount)}</span>
          </div>
          <div className="result-row">
            <span>Total Contributions</span>
            <span className="result-value">{this.formatCurrency(totalContributions)}</span>
          </div>
          <div className="result-row positive">
            <span>Interest Earned</span>
            <span className="result-value">{this.formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </div>
    );
  };

  renderTipCalculator = () => {
    const { tipAmount, total, perPerson } = this.calculateTip();
    
    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Bill Amount</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              step="0.01"
              value={this.state.billAmount}
              onChange={(e) => this.handleInputChange('billAmount', e.target.value)}
              placeholder="100"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Tip Percentage</label>
          <div className="input-wrapper">
            <input
              type="number"
              step="1"
              value={this.state.tipPercent}
              onChange={(e) => this.handleInputChange('tipPercent', e.target.value)}
              placeholder="15"
            />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="input-group">
          <label>Number of People</label>
          <div className="input-wrapper">
            <input
              type="number"
              value={this.state.numPeople}
              onChange={(e) => this.handleInputChange('numPeople', e.target.value)}
              placeholder="1"
              min="1"
            />
          </div>
        </div>

        <div className="results">
          <h3>Results</h3>
          <div className="result-row">
            <span>Tip Amount</span>
            <span className="result-value">{this.formatCurrency(tipAmount)}</span>
          </div>
          <div className="result-row primary">
            <span>Total Bill</span>
            <span className="result-value">{this.formatCurrency(total)}</span>
          </div>
          <div className="result-row">
            <span>Per Person</span>
            <span className="result-value">{this.formatCurrency(perPerson)}</span>
          </div>
        </div>
      </div>
    );
  };

  renderDiscountCalculator = () => {
    const { discountAmount, finalPrice } = this.calculateDiscount();
    
    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Original Price</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              step="0.01"
              value={this.state.originalPrice}
              onChange={(e) => this.handleInputChange('originalPrice', e.target.value)}
              placeholder="100"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Discount Percentage</label>
          <div className="input-wrapper">
            <input
              type="number"
              step="1"
              value={this.state.discountPercent}
              onChange={(e) => this.handleInputChange('discountPercent', e.target.value)}
              placeholder="20"
            />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="results">
          <h3>Results</h3>
          <div className="result-row positive">
            <span>You Save</span>
            <span className="result-value">{this.formatCurrency(discountAmount)}</span>
          </div>
          <div className="result-row primary">
            <span>Final Price</span>
            <span className="result-value">{this.formatCurrency(finalPrice)}</span>
          </div>
        </div>
      </div>
    );
  };

  renderSavingsCalculator = () => {
    const { monthsNeeded, yearsNeeded, totalContributions } = this.calculateSavings();
    
    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Target Amount</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              value={this.state.targetAmount}
              onChange={(e) => this.handleInputChange('targetAmount', e.target.value)}
              placeholder="50000"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Current Savings</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              value={this.state.currentSavings}
              onChange={(e) => this.handleInputChange('currentSavings', e.target.value)}
              placeholder="5000"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Monthly Savings</label>
          <div className="input-wrapper">
            <span className="input-prefix">$</span>
            <input
              type="number"
              value={this.state.monthlySavings}
              onChange={(e) => this.handleInputChange('monthlySavings', e.target.value)}
              placeholder="500"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Expected Annual Return</label>
          <div className="input-wrapper">
            <input
              type="number"
              step="0.1"
              value={this.state.savingsRate}
              onChange={(e) => this.handleInputChange('savingsRate', e.target.value)}
              placeholder="3"
            />
            <span className="input-suffix">%</span>
          </div>
        </div>

        <div className="results">
          <h3>Results</h3>
          {monthsNeeded === Infinity ? (
            <div className="result-row">
              <span className="result-value" style={{fontSize: '16px', color: '#ff6b6b'}}>
                Insufficient monthly savings to reach goal
              </span>
            </div>
          ) : (
            <>
              <div className="result-row primary">
                <span>Time to Goal</span>
                <span className="result-value">
                  {this.formatNumber(yearsNeeded, 1)} years ({Math.ceil(monthsNeeded)} months)
                </span>
              </div>
              <div className="result-row">
                <span>Total Contributions</span>
                <span className="result-value">{this.formatCurrency(totalContributions)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { mode } = this.state;

    return (
      <div className="financial-calculator">
        <div className="calc-tabs">
          <button 
            className={`calc-tab ${mode === 'loan' ? 'active' : ''}`}
            onClick={() => this.setState({ mode: 'loan' })}
          >
            Loan
          </button>
          <button 
            className={`calc-tab ${mode === 'investment' ? 'active' : ''}`}
            onClick={() => this.setState({ mode: 'investment' })}
          >
            Investment
          </button>
          <button 
            className={`calc-tab ${mode === 'tip' ? 'active' : ''}`}
            onClick={() => this.setState({ mode: 'tip' })}
          >
            Tip
          </button>
          <button 
            className={`calc-tab ${mode === 'discount' ? 'active' : ''}`}
            onClick={() => this.setState({ mode: 'discount' })}
          >
            Discount
          </button>
          <button 
            className={`calc-tab ${mode === 'savings' ? 'active' : ''}`}
            onClick={() => this.setState({ mode: 'savings' })}
          >
            Savings
          </button>
        </div>

        <div className="calc-content">
          {mode === 'loan' && this.renderLoanCalculator()}
          {mode === 'investment' && this.renderInvestmentCalculator()}
          {mode === 'tip' && this.renderTipCalculator()}
          {mode === 'discount' && this.renderDiscountCalculator()}
          {mode === 'savings' && this.renderSavingsCalculator()}
        </div>
      </div>
    );
  }
}