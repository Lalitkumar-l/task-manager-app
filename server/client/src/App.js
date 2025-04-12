// src/App.js
import React from 'react';
import './styles/App.css';
import LoginRegister from './components/LoginRegister';
import TaskManager from './components/TaskManager';

function App() {
  
  const isLoggedIn = false;  // Ye baad me auth state se control hoga

  return (
    <div className="App">
      {isLoggedIn ? <TaskManager /> : <LoginRegister />}
    </div>
  );
}

export default App;
