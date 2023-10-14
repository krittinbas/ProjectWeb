import "./login.css";


function Login() {
    
    return (
        <div className="body">
            <div className="header">
                <h1 className="logo">
                    Korn
                </h1>
            </div>
            <div className="wrapepr">
                <div className="form-box">
                    <h2>Login</h2>
                    <form>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="username"/>
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                            </span>
                            <input type="password" />
                            <label>password</label>
                        </div>
                        <div className = "remember-forgot">
                            <label>
                                <input type = "checkbox"/>
                                Remember me
                               
                            </label> <a href = '#'>Forgot Password</a>
                        </div>
                        <button type = "submit" className = "btn">
                            Login
                        </button>
                        <div className = "login-register">
                            <p>
                                Don't have an accout?
                                <a href = "#" className = "register-link">
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