const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
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

