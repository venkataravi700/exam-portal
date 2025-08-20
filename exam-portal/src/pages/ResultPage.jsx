import React from 'react';

const ResultPage = ({ score }) => {
  return (
    <div className="container">
      <h1>Exam Submitted</h1>
      <h2>Your Score: {score}</h2>
      <p>Thank you for taking the exam!</p>
    </div>
  );
};

export default ResultPage;
