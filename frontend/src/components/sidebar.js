import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './css/app.css';
import { FaBars, FaHome, FaTable, FaSignOutAlt } from "react-icons/fa"; // Icons for menu


function SideBar({page}) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar

    const toggleSidebar = () => {
      setIsOpen((prev) => !prev); };

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
            <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
                {/* Hamburger Icon */}
                <button className="hamburgerButton" onClick={toggleSidebar}><FaBars/></button>
                {isOpen && <div className="nav-texts">
		            <div className="usernameGreeting"><h1>Hi, {username}!</h1></div>
                    <div className="nav-items"><div  onClick={handleHome} style={{ padding: isOpen ? "10px 20px" : "10px 0" }}><FaHome className="nav-icons"/><span style={{ marginLeft: "10px" }}>Home</span></div></div>
                    <div className="nav-items"><div className="usernameGreeting" onClick={handleDashboard} style={{ padding: isOpen ? "10px 20px" : "10px 0" }}><FaTable className="nav-icons"/><span style={{ marginLeft: "10px" }}>Dashboard</span></div></div>
                    <div className="nav-items"><div className="usernameGreeting" onClick={handleLogout} style={{ padding: isOpen ? "10px 20px" : "10px 0" }}><FaSignOutAlt className="nav-icons"/><span style={{ marginLeft: "10px" }}>Logout</span></div></div>
                </div>}
            </div>
            </div>
        </div>
    );
}

export default SideBar;
