import './App.css';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './Register/Register';
import ForgotPasswordPage from './forgot/ForgotPasswordPage';
import Page_Manger_key from './keymanagement/page_manger_key';
import Page_STATE from './history/history';
import SidebarDisplay from './Sidebar/SidebarDisplay';


function App() {
    return (
        <div >
            <SidebarDisplay />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgotPasswordPage />} />
                    <Route path="/key" element={<Page_Manger_key />} />
                    <Route path="/state" element={<Page_STATE />} />
                </Routes>
            </Router>
        </div>
    );
}


export default App;
