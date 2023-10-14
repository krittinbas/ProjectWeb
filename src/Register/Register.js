import "./Register.css";

export default function Register() {
    return (
        <div>
            <h2>Register</h2>
            <div className="register-container">
                <input className="register-box" placeholder="email!"></input>
                <input className="register-box" placeholder="username!"></input>
                <input className="register-box" placeholder="password!"></input>
                <input className="register-box" placeholder="confirm password!"></input>

                <button type="submit" className="register-box">
                    register!
                </button>
            </div>
        </div>
    );
}