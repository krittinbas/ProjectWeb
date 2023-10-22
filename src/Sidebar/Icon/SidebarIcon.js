import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SidebarIcon.css';


const SidebarIcon = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="sidebar-icon" onClick={toggleSidebar}>
      <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
    </div>
  );
};

export default SidebarIcon;