import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';

function App() {
  const [examState, setExamState] = useState('login'); // 'login', 'start', 'exam', 'result'
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setExamState('start');
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setExamState('start');
  };

  const handleStartExam = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setExamState('login');
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/exam/questions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch questions');
      }
      const fetchedQuestions = await response.json();
      setQuestions(fetchedQuestions);
      setExamState('exam');
    } catch (error) {
      console.error('Error starting exam:', error);
      alert('Failed to start exam. Please log in again.');
      setExamState('login');
    }
  };

  const handleExamSubmit = async (answers) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit exam.');
      }

      const result = await response.json();
      setScore(result.score);
      setExamState('result');
    } catch (error) {
      console.error('Error submitting exam:', error);
      // Fallback to client-side scoring if submission fails
      let finalScore = 0;
      const questionIds = Object.keys(answers);
      questions.forEach(q => {
          if (questionIds.includes(q._id) && answers[q._id] === q.correctAnswer) {
              finalScore++;
          }
      });
      setScore(finalScore);
      setExamState('result');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setQuestions([]);
    setScore(0);
    setLogoutMessage('You have been logged out successfully.');
    setExamState('login');
  };

  switch (examState) {
    case 'login':
      return <LoginPage onLoginSuccess={handleLoginSuccess} logoutMessage={logoutMessage} setLogoutMessage={setLogoutMessage} />;
    case 'start':
      return (
        <StartPage onStartExam={handleStartExam} onLogout={handleLogout} />
      );
    case 'exam':
      return <ExamPage questions={questions} onExamSubmit={handleExamSubmit} />;
    case 'result':
      return (
        <>
          <ResultPage score={score} />
          <button onClick={handleLogout} className="logout-button" style={{ marginTop: '20px' }}>Take Another Exam</button>
        </>
      );
    default:
      return null;
  }
}

export default App;
