import './webBody.css';
import { useState, useEffect } from "react";
import { url_myAPI } from '../config.js'
import { useLocation, useNavigate } from "react-router-dom";

import bodyNav from './body_nav.js';
import menuNav from './menu_nav';

export default function webBody(prop) {
    const location = useLocation();
    const history = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const mValue = queryParams.get("m");
    const pageValue = queryParams.get("page");

    const [menuClick, setMenuClick] = useState(false);
    const [page, setPageSelect] = useState(0);

    if (pageValue === null) {
        if (pageValue !== page) {
            if (page !== 0) {
                setPageSelect(0);
                history(location.pathname + "?m=" + mValue + "&&" + "page=0")
            }
        }
    } else {
        if (page !== pageValue) setPageSelect(pageValue);
    }

    const [name, setName] = useState("");
    const [idAccount, setIDAccount] = useState(0);

    useEffect(() => {
        fetch(url_myAPI + "/d?m=" + mValue)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setName(data.email);
                    setIDAccount(data.id);
                } else {
                    setName(data.error);
                }
            })
            .catch(err => { });
    }, [setName, setIDAccount]);

    return (
        <div className='webbody-main-container'>
            <menuNav selectpage={page} setMenuClick={setMenuClick}
                menuClick={menuClick} name={name} setPage={setPageSelect} />

            <bodyNav menuClick={menuClick} types={"full"} page={page} 
            Pageset={setPageSelect} id={idAccount} name={name}/>
        </div>
    );
}
