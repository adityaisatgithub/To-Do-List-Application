import { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
      setNewTask("");
    }
  };

  const handleDeleteTask = async (index) => {
    const taskToDelete = tasks[index];

    await fetch(`http://localhost:3000/api/tasks/${taskToDelete._id}`, {
      method: "DELETE",
    });

    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title} {/* Display the task title */}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
