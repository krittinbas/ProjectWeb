import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './SidebarComponent/Sidebar';
import DoorControl from '../firstpage/DoorControl';
import Page_Manger_key from '../keymanagement/page_manger_key';
import OnlyHost from '../HostManager/OnlyHost';
import Page_STATE from '../history/history';

export default function SidebarDisplay(prop) {
  return (
    <Router>
      <div>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/DoorControl" element={<DoorControl />}></Route>
            <Route path="/KeyManager" element={<Page_Manger_key />}></Route>
            <Route path="/KeyHost" element={<OnlyHost />}></Route>
            <Route path="/history" element={<Page_STATE />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}