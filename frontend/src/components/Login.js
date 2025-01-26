import React, { useState, useEffect } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import backgroundImage from './assets/background-image.png';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Read query parameters
    const query = new URLSearchParams(location.search);
    const isVerified = query.get("verified");

    if (isVerified === "true") {
      // Show an alert when redirected after verification
      alert("Your email has been successfully verified! You can now log in.");
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/home'); 
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <h1>SIGN IN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="loginButton" type="submit">Login</button>
        </form>
        <p>New User? <a href="/register">Sign up here!</a></p>
      </div>
    </div>
  );
}

export default Login;
