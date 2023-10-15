import React, { useRef } from "react";
import { url_myAPI } from "../config";
import "./Register.css";
import RegisterForm from "./Registerform";

export default function Register() {
    const emailInput = useRef("");
    const userNameInput = useRef("");
    const passInput = useRef("");
    const newPassInput = useRef("");
  
    const register = (e) => {
      console.log(123);
      e.preventDefault();
      const formData = new URLSearchParams();
      formData.append("email", emailInput.current.value);

      if (passInput.current.value === newPassInput.current.value) {
        formData.append("password", passInput.current.value);
        fetch(`${url_myAPI}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData.toString()
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              alert("register successfully");
            }
          });
      } else {
        alert("Password not match");
      }
    };

    return (
        <RegisterForm emailInput={emailInput} passInput={passInput} newPassInput={newPassInput} register={register}/>
    );
}