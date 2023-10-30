import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarIcon from '../Icon/SidebarIcon';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <SidebarIcon isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={isOpen ? 'sidebar-open' : 'sidebar-close'}>
        <p>
          <Link to="/DoorControl">Door Control</Link>
        </p>
        <p>
          <Link to="/KeyManager">Key Manager</Link>
        </p>
        <p>
          <Link to="/KeyHost">Host Manager</Link>
        </p>
        <p>
          <Link to="/history">User History</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;