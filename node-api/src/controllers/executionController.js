const pool = require('../config/database');

// Listar todas as execuções
const getAllExecutions = async (req, res) => {
  try {
    const [executions] = await pool.query(`
      SELECT 
        e.*,
        t.name as task_name,
        t.task_type
      FROM executions e
      JOIN tasks t ON e.task_id = t.id
      ORDER BY e.created_at DESC
      LIMIT 50
    `);
    res.json({ success: true, data: executions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Buscar execuções de uma tarefa específica
const getExecutionsByTask = async (req, res) => {
  try {
    const [executions] = await pool.query(
      'SELECT * FROM executions WHERE task_id = ? ORDER BY created_at DESC',
      [req.params.taskId]
    );
    res.json({ success: true, data: executions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Buscar execução específica com logs
const getExecutionWithLogs = async (req, res) => {
  try {
    const [execution] = await pool.query(
      'SELECT * FROM executions WHERE id = ?',
      [req.params.id]
    );
    
    if (execution.length === 0) {
      return res.status(404).json({ success: false, message: 'Execução não encontrada' });
    }

    const [logs] = await pool.query(
      'SELECT * FROM logs WHERE execution_id = ? ORDER BY created_at ASC',
      [req.params.id]
    );

    res.json({ 
      success: true, 
      data: {
        execution: execution[0],
        logs: logs
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Estatísticas gerais
const getStats = async (req, res) => {
  try {
    const [totalTasks] = await pool.query('SELECT COUNT(*) as total FROM tasks WHERE is_active = TRUE');
    const [totalExecutions] = await pool.query('SELECT COUNT(*) as total FROM executions');
    const [successRate] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as success_count
      FROM executions
    `);

    const stats = {
      active_tasks: totalTasks[0].total,
      total_executions: totalExecutions[0].total,
      success_count: successRate[0].success_count,
      success_rate: totalExecutions[0].total > 0 
        ? ((successRate[0].success_count / totalExecutions[0].total) * 100).toFixed(2) 
        : 0
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { 
  getAllExecutions, 
  getExecutionsByTask, 
  getExecutionWithLogs,
  getStats 
};