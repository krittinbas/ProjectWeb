export default function RegisterForm(prop){
    return(
        <form className="body" onSubmit={prop.register}>
          <h2>Register</h2>
          <div className="register-container">
            <input
              className="register-box"
              placeholder="email!"
              type="text"
              ref={prop.emailInput}
            ></input>
            <input
              className="register-box"
              placeholder="username!"
              type="text"
              ref={prop.userNameInput}
            ></input>
            <input
              className="register-box"
              placeholder="password!"
              type="text"
              ref={prop.passInput}
            ></input>
            <input
              className="register-box"
              placeholder="confirm password!"
              type="text"
              ref={prop.newPassInput}
            ></input>
    
            <button type="submit" className="register-button">
              register!
            </button>
          </div>
        </form>
    );
}