import { useLocation } from "react-router-dom";
import "./key.css"

export default function MainKey(){
    const location = useLocation()
    console.log(location.state?.data)
    return (
        <div>
            key
        </div>
    );
}