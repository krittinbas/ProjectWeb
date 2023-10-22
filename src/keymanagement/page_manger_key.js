import Item_add_key from './item_add_key'
import Item_key_manger from "./item_key_manger";
import { url_myAPI } from '../config';
import "./main_home.css";
import { useState, useEffect } from 'react';

function Page_Manger_key(props) {
    let user = "cA=="
    const [s, sets] = useState({})
    let data = props.info
    console.log(data)
    return (
        <div>
            <div className="main_page">
                <Item_add_key user={user} />
                {Object.keys(data.HostKey).map((keyId, index) => (
                    <Item_key_manger key={index} keyData={data.key[keyId]} />
                ))}
            </div>
        </div>
    );
}
export default Page_Manger_key;
