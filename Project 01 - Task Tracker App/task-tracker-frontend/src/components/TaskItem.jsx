// TaskItem.jsx
import React from 'react';
const TaskItem = ({ task, index, editIndex, editedTask, handleToggleComplete, handleEditTask, handleDeleteTask, handleEditInputChange, handleCancelEdit, handleSaveEdit }) => {
    return (
        <div key={task._id} className="p-4 mt-4 border border-gray-300 rounded flex items-center justify-between">
            {editIndex === index ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleEditInputChange}
                        className="border rounded py-2 px-3 w-full mb-2"
                    />
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleEditInputChange}
                        rows="3"
                        className="border rounded py-2 px-3 w-full"
                    />
                    <div className="mt-2 flex gap-2">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => handleSaveEdit(index)}>Save</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                        <p className={`text-gray-700 ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="w-6 h-6 cursor-pointer"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(index)}
                        />
                        <button onClick={() => handleEditTask(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Edit
                        </button>
                        <button onClick={() => handleDeleteTask(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default TaskItem;