import React, { useState, useRef } from 'react';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Modal from '../components/Modal';

const ExamPage = ({ questions, onExamSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');
  const timerStopRef = useRef(null);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };

  // This function is triggered by the user or by the timer timeout
  const finalSubmit = () => {
    if (timerStopRef.current) {
      timerStopRef.current(); // Stop the timer when submitted
    }
    setShowConfirmModal(false);
    onExamSubmit(answers); // Pass answers to App.jsx for backend submission
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (!questions || questions.length === 0) {
    return <div>Loading exam...</div>;
  }

  return (
    <div className="exam-container">
      <h1>Online Exam</h1>
      <div className="header">
        <span className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</span>
        <Timer 
          minutes={2} 
          onTimeout={finalSubmit} 
          onTimeUpdate={setRemainingTime}
          timerStopRef={timerStopRef} 
        />
      </div>
      <Question
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion._id]}
        onAnswerChange={handleAnswerChange}
      />
      <div className="navigation-buttons">
        {!isFirstQuestion && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {isLastQuestion ? (
          <button onClick={handleConfirmSubmit} className="submit-button">Submit Exam</button>
        ) : (
          <button onClick={handleNext}>Next</button>
        )}
      </div>

      <Modal 
        show={showConfirmModal}
        onConfirm={finalSubmit}
        onCancel={handleCancelSubmit}
      >
        <h3>Are you sure you want to submit?</h3>
                <p>You have {questions.length - Object.keys(answers).length} questions unanswered.</p>
        <p>Remaining time: {remainingTime}</p>
      </Modal>
    </div>
  );
};

export default ExamPage;
