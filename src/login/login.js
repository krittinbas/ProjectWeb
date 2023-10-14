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
                <div className="from-box login">
                    <h2>Login</h2>
                    <form>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="username"/>
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="password" />
                            <label>password</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;