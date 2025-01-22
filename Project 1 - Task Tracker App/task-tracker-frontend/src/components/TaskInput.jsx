import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(taskTitle.trim() === '') return
        onAddTask({
            title: taskTitle,
            description: taskDescription,
            completed: false
        });
        setTaskTitle('');
        setTaskDescription('');
    };
    return (
      <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Task Title:</label>
          <input
            type="text"
            id="title"
            className="border rounded py-2 px-3 w-full"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            id="description"
            className="border rounded py-2 px-3 w-full"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Task
        </button>
      </form>
    );
  }

export default TaskInput;