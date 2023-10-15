import './App.css';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './Register/Register';
import ForgotPasswordPage from './forgot/ForgotPasswordPage';
import Page_Manger_key from './keymanagement/page_manger_key';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgotPasswordPage />} />
                <Route path="/key" element={<Page_Manger_key/>} />
            </Routes>
        </Router>
    );
}


export default App;
