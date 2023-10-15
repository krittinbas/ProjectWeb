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
          <Link to="/Key_Status">KeyStatus</Link>
        </p>
        <p>
          <Link to="/Key_Management">KeyManagement</Link>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;