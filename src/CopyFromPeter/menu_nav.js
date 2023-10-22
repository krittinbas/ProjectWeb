import './menu_nav.css';
import IconMenu from './menu_component/iconMenu';
import ButtonWebMenu from './menu_component/buttonWebMenu';

export default function MenuNav(prop) {
    let page = prop.page
    let setpage = prop.setPage

    return (
        <div>
            
            <div className={`Menu_web ${false ? "close" : "open"}`}>
                <ButtonWebMenu name="Key_Status" setmyID={0} page={page} setPage={setpage}/>
                <ButtonWebMenu name="Key_Management" setmyID={1} select={page} setPage={setpage}/>
                <ButtonWebMenu name="Host_Manager" setmyID={2} select={page} setPage={setpage}/>
                <ButtonWebMenu name="User_History" setmyID={3} select={page} setPage={setpage}/>
                <div className='d'>
                    <ButtonWebMenu name={"peter"} setmyID={4} select={page} setPage={setpage}/>
                </div>
            </div>
        </div>
    );
}