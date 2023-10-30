import './KeyGenerate.css';
import React, { useState } from 'react';
import { url_myAPI } from '../config';

export default function KeyGenerate() {
    const [keyCode, setKeyCode] = useState('');

    const addKey = async (e) => {
        const shareKey = new URLSearchParams();
        shareKey.append('codeKey', email.current.value);
        
        fetch(`${url_myAPI}GenShareKey`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
    }

    return (
        <form>
            <div className="new-expense_controls">
                <div className="new-expense_control">
                    <label>Generate Key</label>
                    <input type="text" value={keyCode} readOnly />
                </div>
                <div className="new-expense_actions">
                    <button type="button" onClick={addKey}>Generate Key!</button>
                </div>
            </div>
        </form>
    );
}