import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask)
      setTasks([...tasks, response.data])
    } catch (error) {
      setError(error)
    }
  };


  const handleToggleComplete = async (index) => {
    const taskToUpdate = tasks[index];
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskToUpdate._id}`, {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      });
      const updatedTasks = tasks.map((task, i) => {
        if (i === index) {
          return response.data;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      setError(error)
    }

  };

  const handleDeleteTask = async (index) => {
    const taskToDelete = tasks[index];
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`);
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      setError(error)
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index)
    setEditedTask({ ...tasks[index] })
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  }
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask({ ...editedTask, [name]: value })
  }

  const handleSaveEdit = async (index) => {
    try {
      const taskToUpdate = tasks[index];
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskToUpdate._id}`, {
        ...editedTask
      })
      const updatedTasks = tasks.map((task, i) => {
        if (i === index) {
          return response.data
        }
        return task
      })
      setTasks(updatedTasks)
      setEditIndex(null)
      setEditedTask({ title: '', description: '' })

    } catch (error) {
      setError(error)
    }

  }


  if (loading) {
    return <div className="text-center mt-8">Loading tasks...</div>;
  }
  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;
  }
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Tracker</h1>
      <TaskInput onAddTask={handleAddTask} />
      <div className="mt-6">
      {tasks.map((task, index) => (
          <TaskItem
              key={task._id}
              task={task}
              index={index}
              editIndex={editIndex}
              editedTask={editedTask}
              handleToggleComplete={handleToggleComplete}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleEditInputChange={handleEditInputChange}
              handleCancelEdit={handleCancelEdit}
              handleSaveEdit={handleSaveEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;