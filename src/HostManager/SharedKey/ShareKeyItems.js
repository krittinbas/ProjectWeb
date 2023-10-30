import './ShareKeyItems.css';
import Card from '../UI/Card';
import React, { useState, useEffect } from 'react';
import { url_myAPI } from '../../config';
import KeyGenerate from '../KeyGenerate';
import SharedMember_Item from '../SharedMemberItem/SharedMember_Item';

export default function ShareKeyItems(prop) {
    let nickname = prop.data.nickname.String;
    let codeKey = prop.data.codeKey;
    let shareKey = prop.data.shareKey;
    const [who, setwho] = useState({});

    useEffect(() => {
        fetch(url_myAPI + "whoJoinKey?codeKey=" + codeKey)
            .then((response) => response.json())
            .then((data) => {
                setwho(data.data)
                console.log(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [setwho, codeKey]);

    return (
        <div>
            <Card className="sharekey_container">
                <p>codeKey {codeKey}</p>
                <p>nickname {nickname === "" ? "ไม่มี" : nickname}</p>
                <KeyGenerate codeKeysend={codeKey} shareKeySend={shareKey} />
            </Card>
            {Object.values(who).map((item, index) => (
                <SharedMember_Item data1={item} sendCodeKey={codeKey}/>
            ))}
        </div>
    );
}