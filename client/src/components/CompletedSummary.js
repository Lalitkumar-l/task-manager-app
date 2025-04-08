// src/components/CompletedSummary.js
import React from 'react';
import '../styles/CompletedSummary.css';

const CompletedSummary = ({ total, completed }) => {
  return (
    <div className="summary-box">
      <p>✅ Completed: {completed} / {total}</p>
    </div>
  );
};

export default CompletedSummary;
