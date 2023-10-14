import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const handleForgotPassword = ({ email, newPassword }) => {
    // ทำการส่งข้อมูลไปยังเซิร์ฟเวอร์, ตรวจสอบลิงก์ที่ส่งไปยังอีเมล์, และอื่น ๆ
    console.log(`Reset password for email: ${email}, newPassword: ${newPassword}`);
  };

  return (
    <div>
      <h1>Forget Password</h1>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
};

export default ForgotPasswordPage;
