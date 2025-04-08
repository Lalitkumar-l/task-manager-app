import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa';
import '../styles/TaskList.css';
import CompletedSummary from './CompletedSummary';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  // 🔄 Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Add task to backend
  const addTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask = {
      text: taskInput.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axios.post('/api/tasks', newTask);
      setTasks([...tasks, res.data]);
      setTaskInput('');
    } catch (error) {
      console.error('Add Error:', error);
    }
  };

  // ✅ Toggle Complete
  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Toggle Error:', error);
    }
  };

  // 🗑 Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  // 🧹 Clear All Tasks
  const clearAllTasks = async () => {
    try {
      await axios.delete('/api/tasks');
      fetchTasks();
    } catch (error) {
      console.error('Clear All Error:', error);
    }
  };

  // ✏️ Start Edit
  const startEdit = (id, text) => {
    setEditTaskId(id);
    setEditText(text);
  };

  // 💾 Save Edit
  const saveEdit = async () => {
    try {
      await axios.put(`/api/tasks/${editTaskId}`, { text: editText });
      setEditTaskId(null);
      setEditText('');
      fetchTasks();
    } catch (error) {
      console.error('Edit Error:', error);
    }
  };

  // 🌙 Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`task-container ${darkMode ? 'dark' : ''}`}>
      <div className="task-header">
        <h2>Task Manager</h2>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter your task..."
        />
        <button type="submit">Add Task</button>
      </form>

      {/* 🔘 Clear All Button */}
      <button onClick={clearAllTasks} className="clear-btn">
        Clear All Tasks
      </button>

      <CompletedSummary total={total} completed={completed} />

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {editTaskId === task._id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="task-meta">
                  <small>{new Date(task.createdAt).toLocaleString()}</small>
                </div>
                <div className="task-icons">
                  <FaCheck onClick={() => toggleComplete(task._id, task.completed)} />
                  <FaEdit onClick={() => startEdit(task._id, task.text)} />
                  <FaTrash onClick={() => deleteTask(task._id)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
