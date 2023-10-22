import './body_nav.css';
import { url_myAPI } from "../config.js";
import { useEffect, useState } from "react";
import Page_Manger_key from '../keymanagement/page_manger_key';

export default function bodyNav(prop) {
    let menuClick = prop.menuClick;
    let menuPageset = prop.pageset;

    const [key, setkey] = useState({})

    useEffect(() => {
        fetch(url_myAPI + `/stateKey?id=${prop.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setkey(data.data)
                }
            })
    }, [setkey, prop.id])

    return (
        <div className={`body_webMain ${menuClick ? prop.types : ""}`}>
            {prop.id != 0 &&
                <div className="body_webMain-n">
                    {prop.page == 1 && <Page_Manger_key id={prop.id} datakey={key} name={prop.name} />}
                </div>
            }
            {prop.id == 0 && <div style={{ color: "red" }}>404 no response</div>}
        </div>
    );
}