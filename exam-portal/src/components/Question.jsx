import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerChange }) => {
  if (!question) {
    return <div>Loading question...</div>;
  }
  return (
    <div className="question-card">
      <h3>{question.questionText}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${question._id}-${index}`}
              name={question._id}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerChange(question._id, option)}
            />
            <label htmlFor={`${question._id}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
