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
    const [useWebcam, setUseWebcam] = useState(false); // Track webcam usage
    const webcamRef = useRef(null); // Webcam reference
    const navigate = useNavigate();
    let confidence = 0;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const sendFile = async (imageToSend) => {
        let formData = new FormData();
        formData.append("file", imageToSend);
        let res = await axios({
            method: "post",
            url: process.env.REACT_APP_API_URL || 'http://localhost:8000/predict',
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

    // Function to capture webcam image
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPreview(imageSrc);
        setIsloading(true);

        // Convert the image to Blob for sending to the backend
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
            // No token found, redirect to login
            navigate('/login');
        } 

    })

    const handleLogout = () => {
        // Remove the token from localStorage
        const confirmLogout = window.confirm('Do you want to log out?');
        if (confirmLogout) {
            // Remove the token from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            
            // Redirect to the login page
            navigate('/login');
          } else {
            // If the user clicks "No" (Cancel), do nothing
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
                <p1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no
                    Lorem ipsum dolor sit amet, consectetur</p1>
            
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
            
            {/* {isLoading && <p>Loading...</p>}
            <button onClick={clearData}>Clear</button>
            <button onClick={() => setUseWebcam(!useWebcam)}>
                {useWebcam ? "Use Upload" : "Use Webcam"}
            </button>  */}
        </div>
    );
}

export default Home;
