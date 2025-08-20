import React, { useState } from 'react';
import Modal from '../components/Modal';

const StartPage = ({ onStartExam, onLogout }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleStartClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmStart = () => {
    setShowConfirmModal(false);
    onStartExam();
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="container start-page">
      <div className="welcome-box">
        <h2>Welcome to the Exam Portal</h2>
        <p className="welcome-message">
          Hello there! Ready to test your knowledge? Before you begin, please read the instructions below carefully.
        </p>

        <div className="instructions-card">
          <h3>Exam Instructions</h3>
          <ul>
            <li>The exam consists of 5 multiple-choice questions.</li>
            <li>You will have 30 minutes to complete the exam.</li>
            <li>You can navigate between questions using the 'Previous' and 'Next' buttons.</li>
            <li>Your answers will be saved as you select them.</li>
            <li>The exam will automatically submit when the timer runs out.</li>
            <li>You can only submit your answers once.</li>
          </ul>
        </div>
        
        <div className="button-group">
          <button onClick={handleStartClick} className="start-button">Start Exam</button>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </div>
      
      <Modal show={showConfirmModal} onConfirm={handleConfirmStart} onCancel={handleCancel}>
        <h3>Are you sure?</h3>
        <p>Once you start the exam, the timer will begin. You have 30 minutes to complete it.</p>
      </Modal>
    </div>
  );
};

export default StartPage;
