import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './SidebarComponent/Sidebar';
import Page_Manger_key from '../keymanagement/page_manger_key';

export default function SidebarDisplay(){
    return (
        <Router>
          <div>
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/key" component={Page_Manger_key} />
              </Routes>
            </div>
          </div>
        </Router>
      );
}