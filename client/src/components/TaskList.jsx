import { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from '../services/taskService';
import TaskItem from './TaskItem';

function TaskList({ refreshTrigger, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  if (tasks.length === 0) return <p>No tasks yet. Add one above!</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;