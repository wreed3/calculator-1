import React, { Component } from 'react';
import './DateTimeCalculator.css';

export default class DateTimeCalculator extends Component {
  state = {
    mode: 'difference', // 'difference', 'addSubtract', 'age', 'timeDuration', 'businessDays', 'dayOfWeek'
    
    // Date Difference
    startDate: this.getTodayString(),
    endDate: this.getDateString(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    
    // Add/Subtract Days
    baseDate: this.getTodayString(),
    daysToAdd: '30',
    addOrSubtract: 'add',
    
    // Age Calculator
    birthDate: '1990-01-01',
    
    // Time Duration
    startDateTime: this.getDateTimeString(new Date()),
    endDateTime: this.getDateTimeString(new Date(Date.now() + 5 * 60 * 60 * 1000)),
    
    // Business Days
    bizStartDate: this.getTodayString(),
    bizEndDate: this.getDateString(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
    
    // Day of Week
    checkDate: this.getTodayString()
  };

  getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getDateString(date) {
    return date.toISOString().split('T')[0];
  }

  getDateTimeString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleModeChange = (mode) => {
    this.setState({ mode });
  };

  // Calculate difference between two dates
  calculateDateDifference = () => {
    const start = new Date(this.state.startDate);
    const end = new Date(this.state.endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    const diffMs = Math.abs(end - start);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffSeconds = Math.floor(diffMs / 1000);

    // Calculate years, months, days
    let years = 0;
    let months = 0;
    let days = 0;

    let current = new Date(start);
    const target = new Date(end);

    if (start > end) {
      current = new Date(end);
    }

    // Calculate years
    while (current.getFullYear() < target.getFullYear() - 1 || 
           (current.getFullYear() === target.getFullYear() - 1 && 
            current.getMonth() < target.getMonth()) ||
           (current.getFullYear() === target.getFullYear() - 1 && 
            current.getMonth() === target.getMonth() && 
            current.getDate() <= target.getDate())) {
      years++;
      current.setFullYear(current.getFullYear() + 1);
    }

    // Calculate months
    while (current.getMonth() < target.getMonth() || 
           (current.getMonth() === target.getMonth() && 
            current.getDate() <= target.getDate())) {
      if (current.getMonth() === target.getMonth() && 
          current.getDate() > target.getDate()) {
        break;
      }
      months++;
      current.setMonth(current.getMonth() + 1);
      if (months === 12) {
        years++;
        months = 0;
      }
    }

    // Calculate remaining days
    days = Math.floor((target - current) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays: diffDays,
      totalHours: diffHours,
      totalMinutes: diffMinutes,
      totalSeconds: diffSeconds
    };
  };

  // Add or subtract days from a date
  calculateAddSubtractDays = () => {
    const base = new Date(this.state.baseDate);
    const days = parseInt(this.state.daysToAdd) || 0;
    
    if (isNaN(base.getTime())) {
      return null;
    }

    const result = new Date(base);
    if (this.state.addOrSubtract === 'add') {
      result.setDate(result.getDate() + days);
    } else {
      result.setDate(result.getDate() - days);
    }

    return {
      resultDate: result,
      formattedDate: result.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  // Calculate age from birth date
  calculateAge = () => {
    const birth = new Date(this.state.birthDate);
    const today = new Date();
    
    if (isNaN(birth.getTime())) {
      return null;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.floor((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Day of week born
    const dayOfWeek = birth.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      years,
      months,
      days,
      totalDays,
      daysToNextBirthday,
      dayOfWeek
    };
  };

  // Calculate time duration
  calculateTimeDuration = () => {
    const start = new Date(this.state.startDateTime);
    const end = new Date(this.state.endDateTime);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    const diffMs = Math.abs(end - start);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    return {
      hours,
      minutes,
      seconds,
      totalHours,
      totalMinutes,
      totalSeconds
    };
  };

  // Calculate business days (excluding weekends)
  calculateBusinessDays = () => {
    const start = new Date(this.state.bizStartDate);
    const end = new Date(this.state.bizEndDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return null;
    }

    let businessDays = 0;
    let current = new Date(start);
    const target = new Date(end);

    // Ensure start is before end
    if (start > end) {
      current = new Date(end);
    }

    while (current <= target) {
      const dayOfWeek = current.getDay();
      // 0 = Sunday, 6 = Saturday
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    const totalDays = Math.floor(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;

    return {
      businessDays,
      totalDays,
      weekendDays: totalDays - businessDays
    };
  };

  // Get day of week for a date
  getDayOfWeek = () => {
    const date = new Date(this.state.checkDate);
    
    if (isNaN(date.getTime())) {
      return null;
    }

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get week number
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);

    return {
      dayOfWeek,
      formattedDate,
      weekNumber,
      dayOfYear: days + 1
    };
  };

  renderDateDifference = () => {
    const result = this.calculateDateDifference();
    if (!result) return <div className="error">Please enter valid dates</div>;

    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            value={this.state.startDate}
            onChange={(e) => this.handleInputChange('startDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            value={this.state.endDate}
            onChange={(e) => this.handleInputChange('endDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="results">
          <h3>📅 Date Difference</h3>
          <div className="result-row primary">
            <span className="result-label">Duration:</span>
            <span className="result-value">
              {result.years} {result.years === 1 ? 'year' : 'years'}, {' '}
              {result.months} {result.months === 1 ? 'month' : 'months'}, {' '}
              {result.days} {result.days === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Days:</span>
            <span className="result-value">{result.totalDays.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Hours:</span>
            <span className="result-value">{result.totalHours.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Minutes:</span>
            <span className="result-value">{result.totalMinutes.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Seconds:</span>
            <span className="result-value">{result.totalSeconds.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  renderAddSubtractDays = () => {
    const result = this.calculateAddSubtractDays();
    if (!result) return <div className="error">Please enter a valid date</div>;

    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Base Date</label>
          <input
            type="date"
            value={this.state.baseDate}
            onChange={(e) => this.handleInputChange('baseDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="input-group">
          <label>Operation</label>
          <select
            value={this.state.addOrSubtract}
            onChange={(e) => this.handleInputChange('addOrSubtract', e.target.value)}
            className="select-input"
          >
            <option value="add">Add Days</option>
            <option value="subtract">Subtract Days</option>
          </select>
        </div>

        <div className="input-group">
          <label>Number of Days</label>
          <input
            type="number"
            value={this.state.daysToAdd}
            onChange={(e) => this.handleInputChange('daysToAdd', e.target.value)}
            className="number-input"
            min="0"
          />
        </div>

        <div className="results">
          <h3>📆 Result Date</h3>
          <div className="result-row primary">
            <span className="result-label">Date:</span>
            <span className="result-value">{result.formattedDate}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Short Format:</span>
            <span className="result-value">
              {result.resultDate.toLocaleDateString('en-US')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  renderAgeCalculator = () => {
    const result = this.calculateAge();
    if (!result) return <div className="error">Please enter a valid birth date</div>;

    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Birth Date</label>
          <input
            type="date"
            value={this.state.birthDate}
            onChange={(e) => this.handleInputChange('birthDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="results">
          <h3>🎂 Your Age</h3>
          <div className="result-row primary">
            <span className="result-label">Age:</span>
            <span className="result-value">
              {result.years} {result.years === 1 ? 'year' : 'years'}, {' '}
              {result.months} {result.months === 1 ? 'month' : 'months'}, {' '}
              {result.days} {result.days === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Days:</span>
            <span className="result-value">{result.totalDays.toLocaleString()} days</span>
          </div>
          <div className="result-row">
            <span className="result-label">Next Birthday:</span>
            <span className="result-value">
              in {result.daysToNextBirthday} {result.daysToNextBirthday === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Born On:</span>
            <span className="result-value">{result.dayOfWeek}</span>
          </div>
        </div>
      </div>
    );
  };

  renderTimeDuration = () => {
    const result = this.calculateTimeDuration();
    if (!result) return <div className="error">Please enter valid date/times</div>;

    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            value={this.state.startDateTime}
            onChange={(e) => this.handleInputChange('startDateTime', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="input-group">
          <label>End Date & Time</label>
          <input
            type="datetime-local"
            value={this.state.endDateTime}
            onChange={(e) => this.handleInputChange('endDateTime', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="results">
          <h3>⏱️ Time Duration</h3>
          <div className="result-row primary">
            <span className="result-label">Duration:</span>
            <span className="result-value">
              {result.hours} {result.hours === 1 ? 'hour' : 'hours'}, {' '}
              {result.minutes} {result.minutes === 1 ? 'minute' : 'minutes'}, {' '}
              {result.seconds} {result.seconds === 1 ? 'second' : 'seconds'}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Hours:</span>
            <span className="result-value">{result.totalHours.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Minutes:</span>
            <span className="result-value">{result.totalMinutes.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Seconds:</span>
            <span className="result-value">{result.totalSeconds.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

  renderBusinessDays = () => {
    const result = this.calculateBusinessDays();
    if (!result) return <div className="error">Please enter valid dates</div>;

    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            value={this.state.bizStartDate}
            onChange={(e) => this.handleInputChange('bizStartDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            value={this.state.bizEndDate}
            onChange={(e) => this.handleInputChange('bizEndDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="results">
          <h3>💼 Business Days</h3>
          <div className="result-row primary">
            <span className="result-label">Business Days:</span>
            <span className="result-value">{result.businessDays} days</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Calendar Days:</span>
            <span className="result-value">{result.totalDays} days</span>
          </div>
          <div className="result-row">
            <span className="result-label">Weekend Days:</span>
            <span className="result-value">{result.weekendDays} days</span>
          </div>
          <div className="info-text">
            * Excludes Saturdays and Sundays
          </div>
        </div>
      </div>
    );
  };

  renderDayOfWeek = () => {
    const result = this.getDayOfWeek();
    if (!result) return <div className="error">Please enter a valid date</div>;

    return (
      <div className="calc-mode">
        <div className="input-group">
          <label>Select Date</label>
          <input
            type="date"
            value={this.state.checkDate}
            onChange={(e) => this.handleInputChange('checkDate', e.target.value)}
            className="date-input"
          />
        </div>

        <div className="results">
          <h3>📅 Day Information</h3>
          <div className="result-row primary">
            <span className="result-label">Day of Week:</span>
            <span className="result-value">{result.dayOfWeek}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Full Date:</span>
            <span className="result-value">{result.formattedDate}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Week Number:</span>
            <span className="result-value">Week {result.weekNumber} of the year</span>
          </div>
          <div className="result-row">
            <span className="result-label">Day of Year:</span>
            <span className="result-value">Day {result.dayOfYear}</span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { mode } = this.state;

    return (
      <div className="datetime-calculator">
        <div className="calc-tabs">
          <button
            className={`calc-tab ${mode === 'difference' ? 'active' : ''}`}
            onClick={() => this.handleModeChange('difference')}
          >
            Date Diff
          </button>
          <button
            className={`calc-tab ${mode === 'addSubtract' ? 'active' : ''}`}
            onClick={() => this.handleModeChange('addSubtract')}
          >
            Add/Sub
          </button>
          <button
            className={`calc-tab ${mode === 'age' ? 'active' : ''}`}
            onClick={() => this.handleModeChange('age')}
          >
            Age
          </button>
          <button
            className={`calc-tab ${mode === 'timeDuration' ? 'active' : ''}`}
            onClick={() => this.handleModeChange('timeDuration')}
          >
            Time
          </button>
          <button
            className={`calc-tab ${mode === 'businessDays' ? 'active' : ''}`}
            onClick={() => this.handleModeChange('businessDays')}
          >
            Business
          </button>
          <button
            className={`calc-tab ${mode === 'dayOfWeek' ? 'active' : ''}`}
            onClick={() => this.handleModeChange('dayOfWeek')}
          >
            Day/Week
          </button>
        </div>

        <div className="calc-content">
          {mode === 'difference' && this.renderDateDifference()}
          {mode === 'addSubtract' && this.renderAddSubtractDays()}
          {mode === 'age' && this.renderAgeCalculator()}
          {mode === 'timeDuration' && this.renderTimeDuration()}
          {mode === 'businessDays' && this.renderBusinessDays()}
          {mode === 'dayOfWeek' && this.renderDayOfWeek()}
        </div>
      </div>
    );
  }
}