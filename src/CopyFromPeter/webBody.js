import './webBody.css';
import { useState, useEffect } from "react";
import { url_myAPI } from '../config.js'
import { useLocation, useNavigate } from "react-router-dom";

import BodyNav from './body_nav.js';
import MenuNav from './menu_nav';

export default function WebBody(prop) {
    const [page,setPage] = useState(0);
    const location = useLocation()
    let a = location.state?.data
    const [infoaccount,setInforaccount]=useState({})
    console.log(a)
    useEffect(()=>{
        fetch(url_myAPI+"info?user="+a.user)
    .then(response => response.json())
    .then(data=>{
        setInforaccount(data)
    })
    },[setInforaccount])
    return (
        <div className='webbody-main-container'>
            <MenuNav page ={page} setPage = {setPage}/>

            <BodyNav page ={page} setPage = {setPage} info={infoaccount}/>
        </div>
    );
}
