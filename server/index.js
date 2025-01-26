const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-app')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define the ToDo model
const ToDo = mongoose.model('ToDo', new mongoose.Schema({
    title: String,
    completed: Boolean
}));

// Middleware
app.use(express.json());
app.use(cors());

// GET endpoint to show all to-do items
app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST endpoint to add a new to-do item
app.post('/api/tasks', async (req, res) => {
    const { task } = req.body;
    const newTask = new ToDo({
        title: task,
        completed: false
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE endpoint to delete a to-do item
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await ToDo.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

