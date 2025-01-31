import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import SideBar from './sidebar';

function Dashboard() {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReports = async () => {
        const token = localStorage.getItem('token');
        try {
            // const response = await axios.get('http://localhost:8000/api/auth/reports'); // Update with your API endpoint
            const response = await axios.get('http://localhost:8000/api/auth/reports', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setReports(response.data);
        } catch (err) {
            setError('Error fetching reports');
        } finally {
            const timer = setTimeout(() => {
                setLoading(false); // Stop loading after 1 second
            }, 500);}
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleRowClick = (disease, imagePath) => {
        navigate('/report-detail', {
            state: { disease, imagePath },
        });
    };

    if (loading) {
        return (     
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="app">
            <SideBar page="dashboard"/>
            <div className="content">
                <h2>Dashboard</h2>
                <p1>Real-time dashboard for monitoring, detecting, 
                    and managing lemon leaf disease with actionable insights.</p1>

                <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Predicted At</th>
                                <th>Predicted Disease</th>
                                <th>Confidence</th>
                                <th>Image</th>
                            </tr> 
                        </thead>
                        <tbody>
                        {reports
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
                            .map((report, index) => (
                                // <tr key={report.id} className={index % 2 === 0 ? "odd-row" : "even-row"}>
                                <tr
                                key={report.id}
                                onClick={() => handleRowClick(report.predicted_class, report.image_path)}
                                className={`clickable-row $index % 2 === 0 ? 'odd-row' : 'even-row'`}
                            >
                                <td>
                                {
                                    (() => {
                                    const date = new Date(report.created_at);
                                    date.setHours(date.getHours() + 8); 
                                    return date.toLocaleString();
                                    })()
                                }
                                </td>
                                <td>{report.predicted_class}</td>
                                <td>{Math.round(report.confidence * 100)}%</td>
                                
                                <td><img src={"https://raw.githubusercontent.com/evertowers/leaf-disease-images/main/" + report.image_path} class="fixed-size-img"></img></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
} export default Dashboard;
