import './KeyGenerate.css';
import React, { useState } from 'react';

export default function KeyGenerate() {
    const [keyCode, setKeyCode] = useState('');

    const generateKey = async () => {
        try {
            // Make an API request to generate and store the key in the database
            const response = await fetch('/api/generate-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setKeyCode(data.generatedKey);
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