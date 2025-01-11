import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import captureIcon from './assets/capture-icon.png'; 
import uploadIcon from './assets/upload-icon.png'; 
import SideBar from './sidebar';

function Home() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [useWebcam, setUseWebcam] = useState(false); 
    const webcamRef = useRef(null); 
    const navigate = useNavigate();
    let confidence = 0;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const API_URL = process.env.REACT_APP_API_URL || "https://legal-tammi-student0617-c9760f79.koyeb.app";


    const sendFile = async (imageToSend) => {
        let formData = new FormData();
        formData.append("file", imageToSend);
        let res = await axios({
            method: "post",
            url: process.env.REACT_APP_API_URL || `${API_URL}/predict`,
            data: formData,
        });
        if (res.status === 200) {
            setData(res.data);
        }
        setIsloading(false);
    };

    const clearData = () => {
        setData(null);
        setImage(false);
        setSelectedFile(null);
        setPreview(null);
        setUseWebcam(false);
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPreview(imageSrc);
        setIsloading(true);

        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => sendFile(blob));
    }, [webcamRef]);

    const onSelectFile = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            setSelectedFile(undefined);
            setImage(false);
            setData(undefined);
            return;
        }
        setSelectedFile(files[0]);
        setData(undefined);
        setImage(true);
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (preview && !useWebcam) {
            setIsloading(true);
            sendFile(selectedFile);
        }
    }, [preview, useWebcam]);

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }
    
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

    const handleUpload = () => {
        navigate('/upload-pic');
    };

    const handleCapture = () => {
        navigate('/capture-img');
    }

    return (
        <div className="app">
            <SideBar page="home"/>
            <div className="content">
                <h2>Welcome to Lemon Leaf Disease Detection System!</h2>
                <p1>Automated system for early detection of lemon leaf disease, 
                    enabling prompt treatment and healthier crops.</p1>
            
                <div className="optionsContainer">
                    <div className="optionButton">
                        <img src={uploadIcon}/>
                        <button onClick={handleUpload} className="gotoButton"><p2>Upload image from local storage</p2></button>
                    </div>
                    <div className="optionButton">
                        <img src={captureIcon}/>
                        <button onClick={handleCapture} className="gotoButton"><p2>Capture image from camera</p2></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
