import React, { useState } from 'react';

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (value) => {
    // Regular Expression สำหรับตรวจสอบรูปแบบของอีเมลล์
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('กรุณาใส่อีเมลล์ให้ถูกต้อง');
      return;
    }

    // ตรวจสอบว่ารหัสผ่านใหม่และการยืนยันรหัสผ่านตรงกันหรือไม่
    if (newPassword === confirmPassword) {
      onSubmit({ email, newPassword });
    } else {
      alert('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Email:
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="label">
        New password:
        <input
          type="password"
          className="input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label className="label">
        Confirm New password:
        <input
          type="password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="button">
        Confirm
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
