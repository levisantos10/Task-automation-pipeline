const pool = require('../config/database');

// Listar todas as tarefas
const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Buscar tarefa por ID
const getTaskById = async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (tasks.length === 0) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada' });
    }
    res.json({ success: true, data: tasks[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Criar nova tarefa
const createTask = async (req, res) => {
  try {
    const { name, description, task_type, schedule_time } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tasks (name, description, task_type, schedule_time) VALUES (?, ?, ?, ?)',
      [name, description, task_type, schedule_time]
    );
    res.status(201).json({ success: true, message: 'Tarefa criada!', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Atualizar tarefa
const updateTask = async (req, res) => {
  try {
    const { name, description, task_type, schedule_time, is_active } = req.body;
    await pool.query(
      'UPDATE tasks SET name=?, description=?, task_type=?, schedule_time=?, is_active=? WHERE id=?',
      [name, description, task_type, schedule_time, is_active, req.params.id]
    );
    res.json({ success: true, message: 'Tarefa atualizada!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Deletar tarefa
const deleteTask = async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Tarefa deletada!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Ativar/Desativar Tarefa

const toggleTaskStatus = async (req, res) => {
  try {
    const { is_active } = req.body;
    await pool.query(
      'UPDATE tasks SET is_active = ? WHERE id = ?',
      [is_active, req.params.id]
    );
    res.json({ success: true, message: 'Status da tarefa atualizado!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask,  toggleTaskStatus };