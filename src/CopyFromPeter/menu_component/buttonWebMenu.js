import './buttonWebMenu.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonWebMenu(prop) {
    let myid = prop.setmyID
    let page = prop.page
    let setpage = prop.setPage
    return (
        <div className={myid==page ? `button-web-menu-container-a`: "button-web-menu-container-q"} onClick={()=>{setpage(myid)}}>
            <a>{prop.name}</a>
        </div>
    );
}