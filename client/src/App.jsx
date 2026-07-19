import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import WeatherWidget from './components/WeatherWidget';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskSaved = () => {
    setRefreshTrigger((prev) => prev + 1);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
<WeatherWidget />
      <TaskForm
        onTaskCreated={handleTaskSaved}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />
      <TaskList refreshTrigger={refreshTrigger} onEdit={handleEdit} />
    </div>
  );
}

export default App;