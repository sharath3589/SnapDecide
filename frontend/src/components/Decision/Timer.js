import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';

const Timer = ({ duration = 60, onComplete, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
      return;
    }

    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete, duration]);

  const progress = ((duration - timeLeft) / duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getColor = () => {
    if (timeLeft > 30) return 'success';
    if (timeLeft > 10) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
      <Typography 
        variant="h2" 
        component="div" 
        sx={{ 
          fontWeight: 700, 
          fontFamily: 'monospace',
          color: getColor() + '.main',
          mb: 2
        }}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        color={getColor()}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {timeLeft > 0 ? `${timeLeft} seconds remaining` : 'Time\'s up!'}
      </Typography>
    </Box>
  );
};

export default Timer;
