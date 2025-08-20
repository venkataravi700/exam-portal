import React, { useState, useEffect } from 'react';

// The Timer component now takes a new prop: onTimeUpdate
const Timer = ({ minutes, onTimeout, onTimeUpdate, timerStopRef }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  // Formats the remaining seconds into a mm:ss string
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  useEffect(() => {
    // If time runs out, call the onTimeout function
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    // Set up a new interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Call onTimeUpdate with the new formatted time
    onTimeUpdate(formatTime(timeLeft));

    // This exposes a function to the parent component (ExamPage) to stop the timer
    if (timerStopRef) {
      timerStopRef.current = () => clearInterval(intervalId);
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeout, onTimeUpdate, timerStopRef]);

  return (
    <div className="timer-container">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
