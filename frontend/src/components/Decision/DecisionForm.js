import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  Save,
} from '@mui/icons-material';
import Timer from './Timer';
import ProsConsList from './ProsConsList';
import DecisionReview from './DecisionReview';
import api from '../../services/api';

const steps = ['Enter Question', 'Think & List', 'Review & Decide'];

const DecisionForm = ({ onDecisionSaved }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [question, setQuestion] = useState('');
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(60);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleStart = () => {
    if (!question.trim()) {
      setError('Please enter a decision question');
      return;
    }
    setError('');
    setActiveStep(1);
    setTimerActive(true);
  };

  const handleTimerComplete = () => {
    setTimerActive(false);
    setTimeSpent(0);
    setActiveStep(2);
    setReviewOpen(true);
  };

  const handleStopEarly = () => {
    setTimerActive(false);
    setActiveStep(2);
    setReviewOpen(true);
  };

  const handleSaveDecision = async (finalDecisionData) => {
    try {
      const response = await api.post('/decisions', {
        question,
        pros,
        cons,
        finalDecision: finalDecisionData.finalDecision,
        notes: finalDecisionData.notes,
        timeSpent,
        isCompleted: true,
      });

      setSnackbar({
        open: true,
        message: 'Decision saved successfully!',
      });

      // Reset form
      setTimeout(() => {
        setQuestion('');
        setPros([]);
        setCons([]);
        setActiveStep(0);
        setTimerActive(false);
        setTimeSpent(60);
        setReviewOpen(false);
        
        if (onDecisionSaved) {
          onDecisionSaved(response.data.data);
        }
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save decision');
    }
  };

  const handleReset = () => {
    setQuestion('');
    setPros([]);
    setCons([]);
    setActiveStep(0);
    setTimerActive(false);
    setTimeSpent(60);
    setError('');
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600} align="center">
          Make a Decision
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Step 0: Enter Question */}
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              What decision are you trying to make?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Be specific. Examples: "Should I accept the job offer?", "Should I buy this car?"
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Your Decision Question"
              placeholder="Should I..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={handleStart}
              >
                Start 60-Second Timer
              </Button>
            </Box>
          </Box>
        )}

        {/* Step 1: Timer & Pros/Cons */}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
              {question}
            </Typography>
            
            <Timer
              duration={60}
              onComplete={handleTimerComplete}
              isActive={timerActive}
            />

            <ProsConsList
              pros={pros}
              cons={cons}
              onProsChange={setPros}
              onConsChange={setCons}
              disabled={!timerActive}
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              {timerActive && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Stop />}
                  onClick={handleStopEarly}
                >
                  Done Early
                </Button>
              )}
              <Button onClick={handleReset}>
                Start Over
              </Button>
            </Box>
          </Box>
        )}

        {/* Step 2: Review */}
        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Time to review and make your decision!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={() => setReviewOpen(true)}
              sx={{ mt: 2 }}
            >
              Review & Save
            </Button>
            <Box sx={{ mt: 2 }}>
              <Button onClick={handleReset}>
                Start Over
              </Button>
            </Box>
          </Box>
        )}

        <DecisionReview
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          decision={{ question, pros, cons, timeSpent }}
          onSave={handleSaveDecision}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Paper>
    </Container>
  );
};

export default DecisionForm;
