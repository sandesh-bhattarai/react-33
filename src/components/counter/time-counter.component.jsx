import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ minutes }) => {
  // Convert minutes into seconds for easier manipulation
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft === 0) return; // Stop if timer is inactive or time is 0

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId); // Stop the timer when it reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    // Cleanup the interval on component unmount or when the timer is stopped
    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  // Format the time to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
        <>{formatTime(timeLeft)}</>
  );
};

export default CountdownTimer;
