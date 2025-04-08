import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editTask) {
      setTask(editTask.task);
      setDueDate(editTask.dueDate || '');
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    const taskData = {
      task: task.trim(),
      dueDate,
    };

    try {
      if (editTask) {
        await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, taskData);
        setEditTask(null);
      } else {
        await axios.post('http://localhost:5000/api/tasks', taskData);
      }

      setTask('');
      setDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-5 col-sm-12">
          <input
            type="text"
            className="form-control"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3 col-sm-6">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-2 col-sm-6">
          <button type="submit" className="btn btn-primary w-100">
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
