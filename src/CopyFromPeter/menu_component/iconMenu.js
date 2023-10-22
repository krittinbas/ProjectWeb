export default function IconMenu(prop) {
    let setClick = prop.setClick;
    let menuClick = prop.value;

    return (
        <div className="icon-menu-container-main" onClick={() => { setClick(!menuClick) }} >
            <div className="one" onClick={() => { setClick(!menuClick) }}></div>
            <div className="one" onClick={() => { setClick(!menuClick) }}></div>
            <div className="one" onClick={() => { setClick(!menuClick) }}></div>
        </div>
    );
}