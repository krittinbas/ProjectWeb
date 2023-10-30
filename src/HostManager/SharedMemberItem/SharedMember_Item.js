import './SharedMember_Item.css'
import Card from '../UI/Card';
import { url_myAPI } from '../../config';

export default function SharedMember_Item(prop) {

    const GiveHost = () => {
        const formData = new URLSearchParams();
        formData.append("email", prop.data1.email);
        formData.append("codeKey", prop.sendCodeKey);

        fetch(url_myAPI + "tranferHost", {
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
                alert("we transfer host to new one!");
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const DeleteMember = () => {
        const formData = new URLSearchParams();
        formData.append("idaccountskey", prop.data1.idaccountskey);

        fetch(url_myAPI + "Kick", {
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
                alert("delete this member!");
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Card className="member-item">
            <div className='member-nickname'>{prop.data1.idaccountskey}</div>
            <div className='member-nickname'>{prop.data1.email}</div>
            <button onClick={GiveHost} className='member-button'>Give Host!</button>
            <button onClick={DeleteMember} className='member-button'>Delete Member!</button>
        </Card>
    );
}