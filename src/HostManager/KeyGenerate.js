import './KeyGenerate.css';
import React, { useState } from 'react';

export default function KeyGenerate() {
    const [keyCode, setKeyCode] = useState('');

    const generateKey = async () => {
        try {
            // Make an API request to trigger the key generation on the backend
            const response = await fetch('/api/appKeyAdder/generate-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // The key is not returned in this example; you could modify your API to return the generated key
                setKeyCode('555'); // You can clear the input field or update it with the generated key if returned by the API.
            } else {
                console.error('Failed to generate key and update the database.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form>
            <div className="new-expense_controls">
                <div className="new-expense_control">
                    <label>Generate Key</label>
                    <input type="text" value={keyCode} readOnly />
                </div>
                <div className="new-expense_actions">
                    <button type="button" onClick={generateKey}>Generate Key!</button>
                </div>
            </div>
        </form>
    );
}