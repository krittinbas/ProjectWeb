import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { url_myAPI } from './config.js';
import Login from './login/login.js';
import WebBody from "./CopyFromPeter/webBody";
import Register from './Register/Register';
import Page_STATE from './history/history';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<WebBody />} />
                <Route path="/his" element={<Page_STATE />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}
export default App;
