import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ Added import
import '../styles/TaskList.css';
import CompletedSummary from './CompletedSummary';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Fetch Error:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  }, [BASE_URL, navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask = {
      text: taskInput.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks([...tasks, res.data]);
      setTaskInput('');
    } catch (error) {
      console.error('Add Error:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`${BASE_URL}/api/tasks/${id}`, { completed: !completed }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Toggle Error:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  const clearAllTasks = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Clear All Error:', error);
    }
  };

  const startEdit = (id, text) => {
    setEditTaskId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${BASE_URL}/api/tasks/${editTaskId}`, { text: editText }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditTaskId(null);
      setEditText('');
      fetchTasks();
    } catch (error) {
      console.error('Edit Error:', error);
    }
  };

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

      <button onClick={clearAllTasks} className="clear-btn">
        Clear All Tasks
      </button>

      <CompletedSummary total={total} completed={completed} />

      {tasks.length === 0 ? (
        <p className="no-task">No tasks available. Add one!</p>
      ) : (
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
      )}
    </div>
  );
};

export default TaskList;
