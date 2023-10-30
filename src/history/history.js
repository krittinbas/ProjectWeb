import "./history.css";
import { useState, useEffect } from 'react';
import { url_myAPI } from '../config';
import ITEM_STATE from "./item_state";
import SidebarDisplay from "../Sidebar/SidebarDisplay";

export default function Page_STATE() {
    const user = localStorage.getItem("username");
    const [infoAccount, setInfoAccount] = useState(null);

    useEffect(() => {
        fetch(url_myAPI + "info?user=" + user)
            .then(response => response.json())
            .then(data => {

                setInfoAccount(data)
            })
    }, [setInfoAccount]);
    if (infoAccount === null) {
        return <div>Loading...</div>;
    }

    let key = infoAccount.key;
    console.log(key);
    return (
        <div>
            <SidebarDisplay />
            <div className="main_page">
                {Object.keys(key).map((keyId, index) => (
                    <ITEM_STATE key={index} keyData={key[keyId]} />
                ))}
            </div>
        </div>
    );
}
