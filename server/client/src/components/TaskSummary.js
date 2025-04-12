// src/components/TaskSummary.js
import React from 'react';
import '../styles/TaskSummary.css';

const TaskSummary = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return (
    <div className="task-summary">
      <p>Total: {total} | Completed: {completed} | Pending: {pending}</p>
    </div>
  );
};

export default TaskSummary;
