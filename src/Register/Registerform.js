import React, { useState } from 'react';
import './Registerform.css';


export default function RegisterForm(prop) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <form className="body" onSubmit={prop.register}>
      <h2 className='regis-h'>Register</h2>
      <div className="register-container">
        <input
          className="register-box"
          placeholder="email!"
          type="text"
          ref={prop.emailInput}
          required
        ></input>

        <div className="password-container">
          <input
            className="register-box"
            placeholder="password!"
            type={passwordVisible ? 'text' : 'password'}
            ref={prop.passInput}
            required
          ></input>
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {passwordVisible ? 'Hide' : 'Show'}
          </span>
        </div>

        <input
          className="register-box"
          placeholder="confirm password!"
          type={passwordVisible ? 'text' : 'password'}
          ref={prop.newPassInput}
          required
        ></input>

        <button type="submit" className="register-button">
          register!
        </button>
      </div>
    </form>
  );
}