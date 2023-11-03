import React, { useState, useEffect } from 'react';
import './DoorControl.css';
import { url_myAPI } from '../config';

export default function PllageK(promps) {
    const [isLoading, setLoading] = useState(false);
    const [nowState, setNowSate] = useState(false);
    let b = promps.keyState["mykeystatus"]
    let a = promps.codekey

    console.log(b)

    const toggleDoor = () => {
        if (!isLoading) {
            setLoading(true)
            openclose()
            // Simulate API call to toggle the door status
        }
    };
    
    const openclose = () => {
        let state = 0;
        if (b === 0) {
            state = 1
        }
        fetch(url_myAPI + "openclose?codeKey=" + a + "&state=" + state + "&who=" + localStorage.getItem("email"))
            .then(re => re.json())
            .then(data => {
                setLoading(false);
            })
    }
    return (
        <div className="door-control-container">
            <h1 className="door-control-title">{promps.nickname === "" ? promps.codekey : promps.nickname}</h1>
            {promps.nickname !== "" && <h4 className="door-control-title2">{promps.codekey}</h4>}
            <p className='kon'>{promps.keyState.nowCloserDoor === 0 ? "ไม่มีคนหน้าประตู" : "มีคนหน้าประตู"}</p>
            <button
                className={`door-control-button ${b == 0 ? 'open' : 'close'}`}
                onClick={toggleDoor}
            >
                {isLoading ? 'กำลังประมวลผล...' : b == 1 ? 'เปิด' : 'ปิด'}
            </button>
            <p className="door-status">สถานะ: {b == 0 ? 'เปิด' : 'ปิด'}</p>
        </div>
    );
}

