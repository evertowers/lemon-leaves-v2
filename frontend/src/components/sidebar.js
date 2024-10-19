import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './css/app.css';
import homeIcon from './assets/home-icon.png'; 
import dashboardIcon from './assets/dashboard-icon.png'; 
import logoutIcon from './assets/logout-icon.png'; 
import logo from './assets/logo.png'; 
import captureIcon from './assets/capture-icon.png'; 
import uploadIcon from './assets/upload-icon.png'; 

function SideBar({page}) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        } 

    })

    const handleLogout = () => {
        const confirmLogout = window.confirm('Do you want to log out?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
          } else {
            console.log('Logout cancelled');
          }
    };

    const handleHome = () => {
        navigate('/home');
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <div className="app">
                <nav className="sidebar">
                    <div className="logoDiv"> 
                        <img src={logo} alt="Logo" className="logo"/><h1>LEMON LEAF DISEASE DETECTION SYSTEM</h1>
                    </div>
                    <div className="usernameGreeting"><h1>Hi, {username}!</h1></div>
                    <ul className="nav-links">
                        <li className={page === 'home' ? 'selectedLink' : 'notSelectedLink'} onClick={handleHome}><img src={homeIcon}  className="nav-icons"/>    HOME</li>
                        <li className={page === 'dashboard' ? 'selectedLink' : 'notSelectedLink'} onClick={handleDashboard}><img src={dashboardIcon}  className="nav-icons"/>    DASHBOARD</li>
                        <li className="notSelectedLink" onClick={handleLogout}><img src={logoutIcon}  className="nav-icons"/>    LOGOUT</li>
                    </ul>
                    <div className="lowerSideBar"></div>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;
