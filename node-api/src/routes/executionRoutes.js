const express = require('express');
const router = express.Router();
const { 
  getAllExecutions, 
  getExecutionsByTask, 
  getExecutionWithLogs,
  getStats 
} = require('../controllers/executionController');

router.get('/', getAllExecutions);
router.get('/stats', getStats);
router.get('/task/:taskId', getExecutionsByTask);
router.get('/:id', getExecutionWithLogs);

module.exports = router;


