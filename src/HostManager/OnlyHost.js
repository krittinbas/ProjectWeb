import './OnlyHost.css';
import Card from './UI/Card';
import SharedMember_Item from './SharedMemberItem/SharedMember_Item';
import KeyGenerate from './KeyGenerate';

export default function OnlyHost({ nickNameArray }) {
    let arrNick = ["ninr0", "ppp"];
    return (
        <div className='onlyhost-body'>
            <header className='onlyhost-header'>
                <h1>Host Manager</h1>
            </header>

            <Card className="onlyhost-container">
                {arrNick.map((item) => (
                    <SharedMember_Item nickname={item} />
                ))}
            </Card>

            <div className='new-expense'>
                <KeyGenerate />
            </div>

        </div>

    );
    /*
            <div className='onlyhost-body'>
            <header>
                <h1 className='onlyhost-h1'>Host Manager</h1>
            </header>
            <SharedMember memberName="Supachok"/>
    */
}
