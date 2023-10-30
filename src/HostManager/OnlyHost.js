import React, { useState, useEffect } from 'react';
import { url_myAPI } from '../config';
import './OnlyHost.css';
import Card from './UI/Card';
import SidebarDisplay from '../Sidebar/SidebarDisplay';
import ShareKeyItems from './SharedKey/ShareKeyItems';

// HostManger.go
export default function OnlyHost() {
    const [key, setKey] = useState({});
    const [who, setwho] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("username");

        fetch(url_myAPI + "info?user=" + user)
            .then((response) => response.json())
            .then((data) => {
                setKey(data.HostKey);
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [setKey]);

    useEffect(() => {
        fetch(url_myAPI + "whoJoinKey?codeKey=123")
            .then((response) => response.json())
            .then((data) => {
                setwho(data.data)
                console.log(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [setwho]);

    return (
        <div>
            <SidebarDisplay />
            <div className='onlyhost-body'>
                <header className='onlyhost-header'>
                    <h1>Host Manager</h1>
                </header>

                <header className='onlyhost-header'>
                    <h1>Key Manager</h1>
                </header>

                <Card className="onlyhost-key">
                    {Object.values(key).map((item, index) => (
                        <ShareKeyItems data={item} who={who}/>
                    ))}
                </Card>
            </div>
        </div>
    );
}
