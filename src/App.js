import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { url_myAPI } from './config.js';
import Login from './login/login.js';
import Register from './Register/Register';
import ForgotPasswordPage from './forgot/ForgotPasswordPage';
import DoorControl from './firstpage/DoorControl';
import Page_Manger_key from './keymanagement/page_manger_key';
import OnlyHost from './HostManager/OnlyHost';
import Page_STATE from './history/history';
import SidebarDisplay from './Sidebar/SidebarDisplay';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetpass" element={<ForgotPasswordPage />} />

                <Route path="/DoorControl" element={<DoorControl />} />
                <Route path="/KeyManager" element={<Page_Manger_key />} />
                <Route path="/KeyHost" element={<OnlyHost />} />
                <Route path="/history" element={<Page_STATE />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </Router>
    );
}
export default App;
