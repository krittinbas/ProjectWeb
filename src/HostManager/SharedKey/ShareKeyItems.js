import './ShareKeyItems.css';
import Card from '../UI/Card';
import { url_myAPI } from '../../config';
import { useState, useEffect } from 'react';

export default function ShareKeyItems(){
    const user = localStorage.getItem("username");
    const [infoAccount, setInfoAccount] = useState(null);

    useEffect(() => {
        fetch(url_myAPI + "info?user=" + user)
            .then(response => response.json())
            .then(data => {

                setInfoAccount(data)
            })
    }, [setInfoAccount]);

    if(infoAccount.isHost){
        
    }

    return(
        <Card className="sharekey_container">
            <p></p>
            <p></p>
        </Card>
    );
}