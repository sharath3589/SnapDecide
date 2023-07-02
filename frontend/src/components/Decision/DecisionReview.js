import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  CheckCircle,
  Cancel,
  HelpOutline,
} from '@mui/icons-material';

const DecisionReview = ({ open, onClose, decision, onSave }) => {
  const [finalDecision, setFinalDecision] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    onSave({
      ...decision,
      finalDecision,
      notes,
      isCompleted: true,
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight={600}>
          Review Your Decision
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {decision?.question}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {/* Summary */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip 
              icon={<ThumbUp />}
              label={`${decision?.pros?.length || 0} Pros`}
              color="success"
              variant="outlined"
            />
            <Chip 
              icon={<ThumbDown />}
              label={`${decision?.cons?.length || 0} Cons`}
              color="error"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Pros and Cons Review */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Paper sx={{ flex: 1, p: 2, backgroundColor: 'success.lighter' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ThumbUp sx={{ mr: 1, color: 'success.main' }} fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600} color="success.dark">
                Pros
              </Typography>
            </Box>
            <List dense>
              {decision?.pros?.length > 0 ? (
                decision.pros.map((pro, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${pro.text}`} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No pros listed
                </Typography>
              )}
            </List>
          </Paper>

          <Paper sx={{ flex: 1, p: 2, backgroundColor: 'error.lighter' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ThumbDown sx={{ mr: 1, color: 'error.main' }} fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600} color="error.dark">
                Cons
              </Typography>
            </Box>
            <List dense>
              {decision?.cons?.length > 0 ? (
                decision.cons.map((con, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`• ${con.text}`} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No cons listed
                </Typography>
              )}
            </List>
          </Paper>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Final Decision */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            What's your final decision?
          </Typography>
          <RadioGroup
            value={finalDecision}
            onChange={(e) => setFinalDecision(e.target.value)}
          >
            <FormControlLabel 
              value="yes" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 1, color: 'success.main' }} fontSize="small" />
                  Yes, I'll do it
                </Box>
              }
            />
            <FormControlLabel 
              value="no" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cancel sx={{ mr: 1, color: 'error.main' }} fontSize="small" />
                  No, I won't do it
                </Box>
              }
            />
            <FormControlLabel 
              value="undecided" 
              control={<Radio />} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HelpOutline sx={{ mr: 1, color: 'warning.main' }} fontSize="small" />
                  Still undecided
                </Box>
              }
            />
          </RadioGroup>
        </Box>

        {/* Notes */}
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Additional Notes (Optional)"
          placeholder="Any other thoughts or considerations..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={!finalDecision}
        >
          Save Decision
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DecisionReview;
