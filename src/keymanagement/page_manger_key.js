import Item_add_key from './item_add_key'
import Item_key_manger from "./item_key_manger";
import { url_myAPI } from '../config';
import "./main_home.css";
import { useState, useEffect } from 'react';
import SidebarDisplay from '../Sidebar/SidebarDisplay';

function Page_Manger_key() {
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
        // Data is still being fetched, you can show a loading indicator or message
        return <div>Loading...</div>;
    }
    return (
        <div>
            <SidebarDisplay />
            <div className="main_page-c">
                <Item_add_key />

                {infoAccount.keyconnect !== false && (
                    Object.keys(infoAccount.HostKey).map((keyId, index) => (
                        <Item_key_manger key={index} keyData={infoAccount.key[keyId]} />
                    ))
                )}
            </div>
        </div>
    );
}
export default Page_Manger_key;
