import React from 'react';
import './forgotpass.css';
import ForgotPasswordForm from './ForgotPasswordForm';
import { url_myAPI } from '../config';
import { useNavigate } from 'react-router';

const ForgotPasswordPage = () => {
  const linkto = useNavigate()
  const handleForgotPassword = ({ email, newPassword }) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', newPassword);
    fetch(url_myAPI + "/forgetpass", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.data){
        alert(data.data)
        linkto("/login")
      }else{
        alert(data.error)
      }
      
    })
    .catch(errors=>alert(errors))
    console.log(`Reset password for email: ${email}`);
  };

  return (
    <div className='body'>
      <h1>Forget Password</h1>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
};

export default ForgotPasswordPage;
