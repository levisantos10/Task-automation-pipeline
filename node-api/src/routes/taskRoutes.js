const express = require('express');
const router = express.Router();
const { 
  getAllTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskStatus 
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTaskStatus);  // adiciona nova rota
router.delete('/:id', deleteTask);

module.exports = router;
