import '/buttonWebMenu.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonWebMenu(prop) {
    const location = useLocation();
    const history = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const mValue = queryParams.get("m");
    const pageValue = queryParams.get("page");
    let clickMe = prop.setmyID;
    let selection = prop.select;

    return (
        <div className={clickMe==selection ? `button-web-menu-container-a`: "button-web-menu-container-q"} onClick={()=>{history(location.pathname+"?m="+mValue+"&&"+"page="+clickMe)}}>
            <a>{prop.name}</a>
        </div>
    );
}