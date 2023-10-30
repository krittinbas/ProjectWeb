import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import SidebarIcon from '../Icon/SidebarIcon';
import './Sidebar.css';
import Cookies from 'js-cookie';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const Nev = useNavigate();
  
  return (
    <div>
      <SidebarIcon isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={isOpen ? 'sidebar-open' : 'sidebar-close'}>
        <p onClick={()=>Nev("/DoorControl")}>
          Door Control
        </p>
        <p onClick={()=>Nev("/KeyManager")}>
        Key Manager
        </p>
        <p onClick={()=>Nev("/KeyHost")}>
          Host Manager
        </p>
        <p onClick={()=>Nev("/history")}>
          User History
        </p>
        <p onClick={()=>{
          localStorage.clear();
          Cookies.remove("remembered-username")
          Cookies.remove("remembered-password")
        }
          }>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;