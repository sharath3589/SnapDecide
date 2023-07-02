import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import DecisionCard from './DecisionCard';
import api from '../../services/api';

const DecisionHistory = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      const response = await api.get('/decisions');
      setDecisions(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load decisions');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this decision?')) {
      try {
        await api.delete(`/decisions/${id}`);
        setDecisions(decisions.filter((d) => d._id !== id));
        setDialogOpen(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete decision');
      }
    }
  };

  const handleViewDetails = (decision) => {
    setSelectedDecision(decision);
    setDialogOpen(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
        Decision History
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {decisions.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No decisions yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Start making decisions to see them here
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {decisions.map((decision) => (
            <Grid item xs={12} sm={6} md={4} key={decision._id}>
              <DecisionCard
                decision={decision}
                onDelete={handleDelete}
                onClick={() => handleViewDetails(decision)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Decision Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedDecision && (
          <>
            <DialogTitle>
              <Typography variant="h5" fontWeight={600}>
                {selectedDecision.question}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(selectedDecision.createdAt)}
              </Typography>
            </DialogTitle>

            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Decision Outcome
                </Typography>
                <Chip
                  label={
                    selectedDecision.finalDecision === 'yes'
                      ? 'Decided: Yes'
                      : selectedDecision.finalDecision === 'no'
                      ? 'Decided: No'
                      : 'Still Undecided'
                  }
                  color={
                    selectedDecision.finalDecision === 'yes'
                      ? 'success'
                      : selectedDecision.finalDecision === 'no'
                      ? 'error'
                      : 'warning'
                  }
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', md: 'row' } }}>
                <Paper sx={{ flex: 1, p: 2, backgroundColor: 'success.lighter' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ThumbUp sx={{ mr: 1, color: 'success.main' }} fontSize="small" />
                    <Typography variant="subtitle1" fontWeight={600} color="success.dark">
                      Pros ({selectedDecision.pros?.length || 0})
                    </Typography>
                  </Box>
                  <List dense>
                    {selectedDecision.pros?.length > 0 ? (
                      selectedDecision.pros.map((pro, index) => (
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
                      Cons ({selectedDecision.cons?.length || 0})
                    </Typography>
                  </Box>
                  <List dense>
                    {selectedDecision.cons?.length > 0 ? (
                      selectedDecision.cons.map((con, index) => (
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

              {selectedDecision.notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Additional Notes
                    </Typography>
                    <Typography variant="body2">
                      {selectedDecision.notes}
                    </Typography>
                  </Box>
                </>
              )}

              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                Time spent: {selectedDecision.timeSpent} seconds
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => handleDelete(selectedDecision._id)} color="error">
                Delete
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DecisionHistory;
