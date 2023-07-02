import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ThumbUp,
  ThumbDown,
} from '@mui/icons-material';

const ProsConsList = ({ pros, cons, onProsChange, onConsChange, disabled }) => {
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');

  const handleAddPro = () => {
    if (proInput.trim()) {
      onProsChange([...pros, { text: proInput.trim(), createdAt: new Date() }]);
      setProInput('');
    }
  };

  const handleAddCon = () => {
    if (conInput.trim()) {
      onConsChange([...cons, { text: conInput.trim(), createdAt: new Date() }]);
      setConInput('');
    }
  };

  const handleDeletePro = (index) => {
    onProsChange(pros.filter((_, i) => i !== index));
  };

  const handleDeleteCon = (index) => {
    onConsChange(cons.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'pro') {
        handleAddPro();
      } else {
        handleAddCon();
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Pros */}
      <Paper sx={{ flex: 1, p: 3, backgroundColor: 'success.lighter' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ThumbUp sx={{ mr: 1, color: 'success.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.dark' }}>
            Pros
          </Typography>
          <Chip 
            label={pros.length} 
            size="small" 
            sx={{ ml: 'auto', backgroundColor: 'success.main', color: 'white' }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a pro..."
            value={proInput}
            onChange={(e) => setProInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'pro')}
            disabled={disabled}
          />
          <IconButton 
            color="success" 
            onClick={handleAddPro}
            disabled={disabled || !proInput.trim()}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {pros.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No pros added yet
            </Typography>
          ) : (
            pros.map((pro, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText 
                    primary={pro.text}
                    primaryTypographyProps={{ variant: 'body1' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDeletePro(index)}
                      disabled={disabled}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < pros.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      {/* Cons */}
      <Paper sx={{ flex: 1, p: 3, backgroundColor: 'error.lighter' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ThumbDown sx={{ mr: 1, color: 'error.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.dark' }}>
            Cons
          </Typography>
          <Chip 
            label={cons.length} 
            size="small" 
            sx={{ ml: 'auto', backgroundColor: 'error.main', color: 'white' }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Add a con..."
            value={conInput}
            onChange={(e) => setConInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, 'con')}
            disabled={disabled}
          />
          <IconButton 
            color="error" 
            onClick={handleAddCon}
            disabled={disabled || !conInput.trim()}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {cons.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No cons added yet
            </Typography>
          ) : (
            cons.map((con, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText 
                    primary={con.text}
                    primaryTypographyProps={{ variant: 'body1' }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDeleteCon(index)}
                      disabled={disabled}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < cons.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default ProsConsList;
