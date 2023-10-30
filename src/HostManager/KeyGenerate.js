import './KeyGenerate.css';
import React, { useState } from 'react';
import { url_myAPI } from '../config';

export default function KeyGenerate() {
    const [keyCode, setKeyCode] = useState('');

    const addKey = async () => {
        try {
            const codekey = "555"; // Replace with the key you want to insert.
            const response = await fetch(`${url_myAPI}apx/appKeyAdder/app.go`, { // Use the imported URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `codekey=${codekey}`,
            });

            if (response.ok) {
                // Handle success, e.g., display a success message or update the UI.
            } else {
                console.error('Failed to add the key manually.');
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
                    <button type="button" onClick={addKey}>Generate Key!</button>
                </div>
            </div>
        </form>
    );
}