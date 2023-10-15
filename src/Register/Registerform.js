export default function RegisterForm(){
    return(
        <form className="body">
          <h2>Register</h2>
          <div className="register-container">
            <input
              className="register-box"
              placeholder="email!"
              type="text"
              ref={emailInput}
            ></input>
            <input
              className="register-box"
              placeholder="username!"
              type="text"
              ref={userNameInput}
            ></input>
            <input
              className="register-box"
              placeholder="password!"
              type="text"
              ref={passInput}
            ></input>
            <input
              className="register-box"
              placeholder="confirm password!"
              type="text"
              ref={newPassInput}
            ></input>
    
            <button type="submit" className="register-button" onSubmit={register}>
              register!
            </button>
          </div>
        </form>
    );
}