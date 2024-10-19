import { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import backgroundImage from './assets/background-image.png';


function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      alert('Username/Email already used');
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>SIGN UP</h2>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            required 
          />
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
          <button type="submit">Submit</button>
          <p2>Already have an account? <a href="/login">Log in here!</a></p2>
        </form>
      </div>
    </div>
  );
}

export default Register;
