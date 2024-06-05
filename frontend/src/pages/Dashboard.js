import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import DecisionForm from '../components/Decision/DecisionForm';
import DecisionHistory from '../components/History/DecisionHistory';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDecisionSaved = () => {
    setRefreshHistory((prev) => prev + 1);
    setActiveTab(1); // Switch to history tab
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom fontWeight={700} align="center">
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Make a new decision or review your past choices
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="New Decision" />
            <Tab label="My Decisions" />
          </Tabs>
        </Paper>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && (
            <DecisionForm onDecisionSaved={handleDecisionSaved} />
          )}
          {activeTab === 1 && (
            <Container maxWidth="lg">
              <DecisionHistory key={refreshHistory} />
            </Container>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
