import React from 'react';
import '../styles/Navbar.css'; // Make sure you have CSS for styling

const Navbar = ({ onClearAll, onExport }) => {
  const showAbout = () => {
    alert("📌 About This App\n\nThis Task Manager helps you stay organized.\nBuilt with React.js + Node.js + MongoDB.");
  };

  const showHelp = () => {
    alert("🆘 Help\n\n✅ Add Task using input field\n✔ Mark Complete\n✏ Edit Task\n🗑 Delete Task\n🌙 Toggle Dark Mode from top-right");
  };

  const showContact = () => {
    alert("📬 Contact\n\nEmail: lalitkumar962789@gmail.com\nGitHub: https://github.com/Lalitkumar-l");
  };

  const rateApp = () => {
    window.open("https://github.com/Lalitkumar-l", "_blank");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Task Manager</div>

      <ul className="navbar-links">
        <li><button onClick={showAbout}>About</button></li>
        <li><button onClick={showHelp}>Help</button></li>
        <li><button onClick={showContact}>Contact</button></li>
        <li><button onClick={rateApp}>Rate This App</button></li>
        <li><button onClick={onExport}>Export Tasks</button></li>
        {/* <li><button onClick={onClearAll}>Clear All</button></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
