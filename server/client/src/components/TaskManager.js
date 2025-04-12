// src/components/TaskManager.js
import React from 'react';
import TaskList from './TaskList';
import Navbar from './Navbar';

const TaskManager = () => {
  return (
    <>
      <Navbar />
      <TaskList />
    </>
  );
};

export default TaskManager;
