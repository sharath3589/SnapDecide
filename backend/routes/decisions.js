const express = require('express');
const router = express.Router();
const {
  createDecision,
  getDecisions,
  getDecision,
  updateDecision,
  deleteDecision
} = require('../controllers/decisionController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .post(createDecision)
  .get(getDecisions);

router.route('/:id')
  .get(getDecision)
  .put(updateDecision)
  .delete(deleteDecision);

module.exports = router;
