import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">📅</div>
      <ul className="sidebar-menu">
        <li>🏠</li>
        <li>📅</li>
        <li>📣</li>
        <li>📊</li>
        <li>🏢</li>
        <li>⚙️</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
