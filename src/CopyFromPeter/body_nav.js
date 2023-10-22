import './body_nav.css';
import { url_myAPI } from "../config.js";
import { useEffect, useState } from "react";
import Page_Manger_key from '../keymanagement/page_manger_key';
import OnlyHost from '../HostManager/OnlyHost';
import DoorControl from '../firstpage/DoorControl';
import Page_STATE from '../history/history';

export default function BodyNav(prop) {
    return (
        <div className={`body_webMain`}>

                <div className="body_webMain-n">
                    {prop.page == 0 && <DoorControl/>}
                    {prop.page == 1 && <Page_Manger_key info={prop.info}/>}
                    {prop.page == 2 && <OnlyHost/>}
                    {prop.page == 3 && <Page_STATE/>}
                </div>
         
        </div>
    );
}