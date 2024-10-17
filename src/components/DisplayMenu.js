import React, { useState, useEffect, useRef } from 'react';
import '../styles/DisplayMenu.css';

const DisplayMenu = ({ settings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); 
      }
    };


    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="display-menu" ref={menuRef}>
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/Display.svg" alt="Display Icon" className="icon" />
        Display
        <img src="/down.svg" alt="Down Arrow Icon" className="icon" /> 
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          <div className="menu-item">
            <label className="menu-label">Grouping</label>
            <select
              value={settings.groupBy}
              onChange={(e) => handleChange('groupBy', e.target.value)}
              className="menu-select"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="menu-item">
            <label className="menu-label">Ordering</label>
            <select
              value={settings.orderBy}
              onChange={(e) => handleChange('orderBy', e.target.value)}
              className="menu-select"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayMenu;
