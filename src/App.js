import './App.css';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './Register/Register';
import ForgotPasswordPage from './forgot/ForgotPasswordPage';
import Page_Manger_key from './keymanagement/page_manger_key';
import Page_STATE from './history/history';
import SidebarDisplay from './Sidebar/SidebarDisplay';
import DoorControl from './firstpage/DoorControl';


function App() {
    return (
        <DoorControl></DoorControl>
    );
}


export default App;
