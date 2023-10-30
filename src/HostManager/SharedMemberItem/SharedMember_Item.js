import './SharedMember_Item.css'
import Card from '../UI/Card';

export default function SharedMember_Item(prop) {
    const GiveHost = () => {
    };
    const DeleteMember = () => {
    };

    return (
        <Card className="member-item">
            <div className='member-nickname'>{prop.nickname}jedi</div>
            <button onClick={GiveHost} className='member-button'>Give Host!</button>
            <button onClick={DeleteMember} className='member-button'>Delete Member!</button>
        </Card>
    );
}