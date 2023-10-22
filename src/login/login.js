import "./login.css";
import { useRef } from "react";
import { url_myAPI } from "../config";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';


function Login() {
    
    const email = useRef("")
    const check = useRef(null)
    const pass = useRef("")
    const nav = useNavigate()
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
                email1 = data.email
                user = data.user
                id = data.id
                nav("/app", { state: { data: { email: email1, user: user,id:id } } })

                if (rememberMe) {
                    Cookies.set('remembered-username', email.current.value, { expires: 7 });
                    Cookies.set('remembered-password', pass.current.value, { expires: 7 });
                }
        
            }
        })
    }
    return (
        <div className="login-body">
            <div className="login-header">
                <h1 className="login-logo">
                    
                </h1>
            </div>
            <div className="login-wrapepr">
                <div className="login-form-box">
                    <h2>Login</h2>
                    <form onSubmit={login}>
                        <div className="login-input-box">
                            <span className="login-icon"></span>
                            <input type="email" ref={email} />
                            <label>Email</label>
                        </div>
                        <div className="login-input-box">
                            <span className="login-icon"></span>
                            <input type="password" ref={pass} />
                            <label>Password</label>
                        </div>
                        <div className="login-remember-forgot">
                            <label>
                                <input type="checkbox" checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}/>
                                Remember me
                            </label> <Link to = '/forgot'>Forgot Password</Link>
                        </div>
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        <div className="login-register">
                            <p>
                                Don't have an accout?
                                <Link to = '/register' className="login-register-link">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;