import Item_add_key from './item_add_key'
import Item_key_manger from "./item_key_manger";
import { url_myAPI } from '../config';
import "./main_home.css";
import { useState, useEffect } from 'react';

function Page_Manger_key(props) {
    let user = "cA=="
    const [s, sets] = useState({})
    
    useEffect(() => {
        fetch(url_myAPI + "/info?user=" + user)
            .then(re => re.json())
            .then(data => {
                sets(data.key);
            })
    }, [sets])

    return (
        <div>
            <div className="main_page">
                <Item_add_key user={user} />
                {Object.keys(s).map((keyId, index) => (

                    <Item_key_manger key={index} keyData={s[keyId]} />
                ))}
            </div>
        </div>
    );
}
export default Page_Manger_key;
