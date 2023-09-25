const Decision = require('../models/Decision');

// @desc    Create new decision
// @route   POST /api/decisions
// @access  Private
const createDecision = async (req, res) => {
  try {
    const { question, pros, cons, finalDecision, notes, timeSpent } = req.body;

    if (!question) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a decision question'
      });
    }

    const decision = await Decision.create({
      user: req.user._id,
      question,
      pros: pros || [],
      cons: cons || [],
      finalDecision: finalDecision || '',
      notes: notes || '',
      timeSpent: timeSpent || 60
    });

    res.status(201).json({
      status: 'success',
      data: decision
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get all user decisions
// @route   GET /api/decisions
// @access  Private
const getDecisions = async (req, res) => {
  try {
    const decisions = await Decision.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      count: decisions.length,
      data: decisions
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single decision
// @route   GET /api/decisions/:id
// @access  Private
const getDecision = async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id);

    if (!decision) {
      return res.status(404).json({
        status: 'error',
        message: 'Decision not found'
      });
    }

    // Make sure user owns decision
    if (decision.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this decision'
      });
    }

    res.json({
      status: 'success',
      data: decision
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update decision
// @route   PUT /api/decisions/:id
// @access  Private
const updateDecision = async (req, res) => {
  try {
    let decision = await Decision.findById(req.params.id);

    if (!decision) {
      return res.status(404).json({
        status: 'error',
        message: 'Decision not found'
      });
    }

    // Make sure user owns decision
    if (decision.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to update this decision'
      });
    }

    const { question, pros, cons, finalDecision, notes, isCompleted, timeSpent } = req.body;

    decision = await Decision.findByIdAndUpdate(
      req.params.id,
      {
        question: question || decision.question,
        pros: pros !== undefined ? pros : decision.pros,
        cons: cons !== undefined ? cons : decision.cons,
        finalDecision: finalDecision !== undefined ? finalDecision : decision.finalDecision,
        notes: notes !== undefined ? notes : decision.notes,
        timeSpent: timeSpent !== undefined ? timeSpent : decision.timeSpent,
        isCompleted: isCompleted !== undefined ? isCompleted : decision.isCompleted,
        completedAt: isCompleted ? new Date() : decision.completedAt
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      data: decision
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete decision
// @route   DELETE /api/decisions/:id
// @access  Private
const deleteDecision = async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id);

    if (!decision) {
      return res.status(404).json({
        status: 'error',
        message: 'Decision not found'
      });
    }

    // Make sure user owns decision
    if (decision.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to delete this decision'
      });
    }

    await decision.deleteOne();

    res.json({
      status: 'success',
      message: 'Decision removed'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  createDecision,
  getDecisions,
  getDecision,
  updateDecision,
  deleteDecision
};
