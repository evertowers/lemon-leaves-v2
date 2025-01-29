import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import backgroundImage from './assets/background-image.png';

const RegisterSuccess = () => {

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="login-container">
        <h1>EMAIL VERIFICATION</h1>
        <h3>We’ve sent a verification link to your email. Kindly check your inbox and follow the link to verify your email and activate your account.</h3>
        <p><a href="/login">Already Verified? Go to Login Page </a></p>
        </div>
    </div>
  );
};

export default RegisterSuccess;
