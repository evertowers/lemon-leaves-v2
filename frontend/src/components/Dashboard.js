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

    // Fetch reports data
    const fetchReports = async () => {
        const token = localStorage.getItem('token');
        try {
            // const response = await axios.get('http://localhost:8000/api/auth/reports'); // Update with your API endpoint
            const response = await axios.get('http://localhost:8000/api/auth/reports', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request headers
                },
            });
            setReports(response.data); // Assuming your API returns the reports array
        } catch (err) {
            setError('Error fetching reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="app">
            <SideBar page="dashboard"/>
            <div className="content">
                <h2>Dashboard</h2>
                <p1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no
                    Lorem ipsum dolor sit amet, consectetur</p1>

                <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Image Path</th>
                                <th>Predicted Disease</th>
                                <th>Confidence</th>
                                <th>Predicted At</th>
                            </tr> 
                        </thead>
                        <tbody>
                        {reports
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort in descending order
                            .map((report, index) => (
                                <tr key={report.id} className={index % 2 === 0 ? "odd-row" : "even-row"}>
                                <td>{report.image_path}</td>
                                <td>{report.predicted_class}</td>
                                <td>{Math.round(report.confidence * 100)}%</td>
                                <td>
                                {
                                    (() => {
                                    const date = new Date(report.created_at);
                                    date.setHours(date.getHours() + 8); // Add 8 hours
                                    return date.toLocaleString();
                                    })()
                                }
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
} export default Dashboard;
