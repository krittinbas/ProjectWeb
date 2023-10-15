import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './SidebarComponent/Sidebar';
import Key_Status from './SidebarComponent/Key_Status';
import Key_Management from './SidebarComponent/Key_Management';

export default function SidebarDisplay(){
    return (
        <Router>
          <div>
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/Key_Status" component={Key_Status} />
                <Route path="/Key_Management" component={Key_Management} />
              </Routes>
            </div>
          </div>
        </Router>
      );
}