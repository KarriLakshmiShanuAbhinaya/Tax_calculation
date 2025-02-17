import React, { useState } from 'react';
import axios from 'axios';
import './TaxForm.css'; // Import the CSS file

const TaxForm = () => {
  const [formData, setFormData] = useState({
    income: '',
    investments: '',
    deductions: '',
    otherIncome: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tax/calculate', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating tax:', error);
    }
  };

  return (
    <div className="tax-form">
      <form onSubmit={handleSubmit}>
        <label>Income:</label>
        <input
          type="number"
          name="income"
          value={formData.income}
          onChange={handleChange}
          required
        />

        <label>Investments:</label>
        <input
          type="number"
          name="investments"
          value={formData.investments}
          onChange={handleChange}
          required
        />

        <label>Deductions:</label>
        <input
          type="number"
          name="deductions"
          value={formData.deductions}
          onChange={handleChange}
          required
        />

        <label>Other Income:</label>
        <input
          type="number"
          name="otherIncome"
          value={formData.otherIncome}
          onChange={handleChange}
          required
        />

        <button type="submit">Calculate Tax</button>
      </form>

      {result && (
        <div className="result">
          <h3>Results:</h3>
          <p>Taxable Income: {result.taxableIncome}</p>
          <p>Tax Payable: {result.taxPayable}</p>
        </div>
      )}
    </div>
  );
};

export default TaxForm;
