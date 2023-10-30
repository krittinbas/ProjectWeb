import './KeyGenerate.css';
import React, { useState } from 'react';
import { url_myAPI } from '../config';

export default function KeyGenerate(prop) {
    const [keyCode, setKeyCode] = useState('');

    const AddKey = () => {
        const formData = new URLSearchParams();
        formData.append("codeKeypp", prop.codeKeysend);

        fetch(url_myAPI + "GenShareKey", {
            method: 'POST', // Send a POST request
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKeyCode(data.shareKey);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const DeleteKey = () => {
        const formData = new URLSearchParams();
        formData.append("codeKeypp", prop.codeKeysend);

        fetch(url_myAPI + "GenDeleteKey", {
            method: 'POST', // Send a POST request
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKeyCode(" ");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form>
            <div className="new-expense_controls">
                <div className="new-expense_control">
                    <label>Generate Key</label>
                    <input type="text" value={keyCode || "" || prop.shareKeySend} readOnly />
                </div>
                <div className='button-function'>
                    <button type="button" onClick={AddKey}>Generate Key!</button>
                </div>
                <div className='button-function'>
                    <button type="button" onClick={DeleteKey}>Delete Key!</button>
                </div>
            </div>
        </form>
    );
}