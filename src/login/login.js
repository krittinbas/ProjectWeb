import "./login.css";
import { useRef } from "react";
import { url_myAPI } from "../config";
import React, { useState } from 'react';
import Cookies from 'js-cookie';

function Login() {

    const email = useRef("")
    const check = useRef(null)
    const pass = useRef("")

    const [rememberMe, setRememberMe] = useState(false);

    let email1
    let user
    let id
    const login = (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('email', email.current.value);
        formData.append('password', pass.current.value);
        fetch(`${url_myAPI}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
        .then(response=>response.json())
        .then(data=>{
            if (data.error) {
                alert(data.error);
            }else{
                email1=data.email
                user = data.user
                id = data.id
                if (rememberMe) {
                    Cookies.set('remembered-username', user, { expires: 7 });
                    Cookies.set('remembered-password', id, { expires: 7 });
                }
        
            }
        })
    }
    return (
        <div className="body">
            <div className="header">
                <h1 className="logo">
                    
                </h1>
            </div>
            <div className="wrapepr">
                <div className="form-box">
                    <h2>Login</h2>
                    <form onSubmit={login}>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="email" ref={email} />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="password" ref={pass} />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}/>
                                Remember me
                            </label> <a href='#'>Forgot Password</a>
                        </div>
                        <button type="submit" className="btn">
                            Login
                        </button>
                        <div className="login-register">
                            <p>
                                Don't have an accout?
                                <a href="#" className="register-link">
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;