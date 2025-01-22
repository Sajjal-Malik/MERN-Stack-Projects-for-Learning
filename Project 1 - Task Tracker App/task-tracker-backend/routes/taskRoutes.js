const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//Get all tasks
router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
//Create Task
router.post('/', async (req, res) => {
   const task = new Task({
       title: req.body.title,
       description: req.body.description,
       completed: req.body.completed,
   });
   try {
     const newTask = await task.save();
     res.status(201).json(newTask);
   } catch (error) {
     res.status(400).json({message: error.message});
   }
});

// Update Task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).json({message: 'Task not found'});
        res.json({message: 'Task deleted'});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
});

module.exports = router;