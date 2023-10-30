import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
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
    const location = useLocation();
    let userData = location.state?.data
    const [infoAccount, setInfoAccount] = useState({});

    useEffect(() => {
        fetch(url_myAPI + "info?user=" + userData.user)
            .then(response => response.json())
            .then(data => {
                setInfoAccount(data)
            })
    }, [setInfoAccount])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetpass" element={<ForgotPasswordPage />} />

                <div>
                    <SidebarDisplay info={infoAccount} />
                    <Route path="/DoorControl" element={<DoorControl />}></Route>
                    <Route path="/KeyManager" element={<Page_Manger_key info={infoAccount} />}></Route>
                    <Route path="/KeyHost" element={<OnlyHost />}></Route>
                    <Route path="/history" element={<Page_STATE info={infoAccount} />} />
                </div>

                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
export default App;
