import React, { useState, useEffect } from 'react';
import { url_myAPI } from '../config.js';
import './OnlyHost.css';
import Card from './UI/Card';
import SharedMember_Item from './SharedMemberItem/SharedMember_Item';
import KeyGenerate from './KeyGenerate';

export default function OnlyHost({ nickNameArray }) {
    let arrNick = ["ninr0", "ppp"];
    const [key, setKey] = useState({});

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(url_myAPI + "info?user=cGV0ZXJAcGV0ZXIuY29t")
                .then((response) => response.json())
                .then((data) => {
                    setKey(data.key)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                });
        }, 1000);

        // ทำความสะอาด interval เมื่อคอมโพเนนต์ถูกถอด
        return () => clearInterval(intervalId);
    }, [setKey, key]);

    return (
        <div className='onlyhost-body'>
            <header className='onlyhost-header'>
                <h1>Host Manager</h1>
            </header>

            <Card className="onlyhost-container">
                {arrNick.map((item) => (
                    <SharedMember_Item nickname={item} />
                ))}

                {Object.keys(key).map((keyId, index) => (
                    <SharedMember_Item nickname={key[keyId].nickname} />
                ))}
            </Card>

            <div className='new-expense'>
                <KeyGenerate />
            </div>

        </div>
    );
}
