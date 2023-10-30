import React, { useState, useEffect } from 'react';
import './OnlyHost.css';
import Card from './UI/Card';
import SharedMember_Item from './SharedMemberItem/SharedMember_Item';
import KeyGenerate from './KeyGenerate';

// HostManger.go
export default function OnlyHost({ nickNameArray }) {
    const [members, setMembers] = useState([])

    useEffect(() => {
        // Make an HTTP request to fetch the members of the host key
        fetch('/api/route-to-ListMemberJoinkey?codeKey=your-key', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setMembers(data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching member data: ', error);
            });
    }, []);

    return (
        <div className='onlyhost-body'>
            <header className='onlyhost-header'>
                <h1>Host Manager</h1>
            </header>

            <Card className="onlyhost-container">
                <ul>
                    {members.map(member => (
                        <SharedMember_Item
                            key={member.idaccountskey}
                            email={member.email}
                        />
                    ))}
                </ul>
            </Card>

            <div className='new-expense'>
                <KeyGenerate />
            </div>

        </div>
    );
}
