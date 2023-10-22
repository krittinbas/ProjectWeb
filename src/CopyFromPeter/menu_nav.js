import './menu_nav.css';
import IconMenu from './menu_component/iconMenu';
import ButtonWebMenu from './menu_component/buttonWebMenu';

export default function menuNav(prop) {
    let page = prop.selectpage;
    let setMenuClick = prop.setMenuClick;
    let menuClick = prop.menuClick;
    let nameProfile = prop.name;

    return (
        <div>
            <IconMenu setClick={setMenuClick} value={menuClick} />
            <div className={`Menu_web ${menuClick ? "close" : "open"}`}>
                <ButtonWebMenu name="Key_Status" setmyID={0} select={page} />
                <ButtonWebMenu name="Key_Management" setmyID={1} select={page} />
                <ButtonWebMenu name="Host_Manager" setmyID={2} select={page} />
                <ButtonWebMenu name="User_History" setmyID={3} select={page} />
                <div className='d'>
                    <ButtonWebMenu name={nameProfile} setmyID={4} select={page} />
                </div>
            </div>
        </div>
    );
}