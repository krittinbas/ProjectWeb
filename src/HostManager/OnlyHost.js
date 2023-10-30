import React, { useState, useEffect } from 'react';
import './OnlyHost.css';
import Card from './UI/Card';
import SharedMember_Item from './SharedMemberItem/SharedMember_Item';
import KeyGenerate from './KeyGenerate';
import SidebarDisplay from '../Sidebar/SidebarDisplay';
import ShareKeyItems from './SharedKey/ShareKeyItems';

// HostManger.go
export default function OnlyHost() {
    return (
        <div>
            <SidebarDisplay />
            <div className='onlyhost-body'>
                <header className='onlyhost-header'>
                    <h1>Host Manager</h1>
                </header>

                <Card className="onlyhost-container">
                    <SharedMember_Item />
                    <SharedMember_Item />
                    <SharedMember_Item />
                    <SharedMember_Item />
                    <SharedMember_Item />
                </Card>

                <header className='onlyhost-header'>
                    <h1>Key Manager</h1>
                </header>

                <Card className="onlyhost-key">
                    <ShareKeyItems />
                </Card>

                <div className='new-expense'>
                    <KeyGenerate />
                </div>

            </div>
        </div>
    );
}
