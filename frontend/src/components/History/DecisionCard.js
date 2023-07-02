import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  CheckCircle,
  Cancel,
  HelpOutline,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const DecisionCard = ({ decision, onDelete, onClick }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDecisionIcon = () => {
    switch (decision.finalDecision) {
      case 'yes':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'no':
        return <Cancel sx={{ color: 'error.main' }} />;
      case 'undecided':
        return <HelpOutline sx={{ color: 'warning.main' }} />;
      default:
        return null;
    }
  };

  const getDecisionLabel = () => {
    switch (decision.finalDecision) {
      case 'yes':
        return 'Decided: Yes';
      case 'no':
        return 'Decided: No';
      case 'undecided':
        return 'Still Thinking';
      default:
        return 'In Progress';
    }
  };

  const getDecisionColor = () => {
    switch (decision.finalDecision) {
      case 'yes':
        return 'success';
      case 'no':
        return 'error';
      case 'undecided':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {formatDate(decision.createdAt)}
          </Typography>
          {decision.isCompleted && (
            <Chip
              icon={getDecisionIcon()}
              label={getDecisionLabel()}
              size="small"
              color={getDecisionColor()}
              variant="outlined"
            />
          )}
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {decision.question}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Chip
            icon={<ThumbUp />}
            label={`${decision.pros?.length || 0} pros`}
            size="small"
            color="success"
            variant="outlined"
          />
          <Chip
            icon={<ThumbDown />}
            label={`${decision.cons?.length || 0} cons`}
            size="small"
            color="error"
            variant="outlined"
          />
        </Box>

        {decision.notes && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mt: 2 }}
            noWrap
          >
            Note: {decision.notes}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {decision.timeSpent}s spent
        </Typography>
        {onDelete && (
          <Tooltip title="Delete decision">
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(decision._id);
              }}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default DecisionCard;
