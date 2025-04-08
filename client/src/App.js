import Navbar from './components/Navbar';
import TaskList from './components/TaskList'; // ✅ Import TaskList
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
      localStorage.removeItem("tasks");
    }
  };

  const handleExport = () => {
    const fileData = JSON.stringify(tasks, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'tasks.json';
    link.href = url;
    link.click();
  };

  return (
    <div className="App">
      <Navbar onClearAll={handleClearAll} onExport={handleExport} />
      
      {/* ✅ Render the main Task Manager UI */}
      <TaskList />
    </div>
  );
}

export default App;
