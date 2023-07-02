const mongoose = require('mongoose');

const DecisionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: [true, 'Please provide a decision question'],
    trim: true,
    maxlength: [200, 'Question cannot be more than 200 characters']
  },
  pros: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  cons: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  finalDecision: {
    type: String,
    enum: ['yes', 'no', 'undecided', ''],
    default: ''
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  timeSpent: {
    type: Number,
    default: 60,
    min: 0,
    max: 60
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Index for faster queries
DecisionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Decision', DecisionSchema);
