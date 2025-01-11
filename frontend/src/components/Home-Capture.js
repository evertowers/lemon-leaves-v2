import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import SideBar from './sidebar';
import DiseaseGreening from './disease-greening';
import DiseaseCanker from './disease-canker';
import DiseaseMelanose from './disease-melanose';
import DiseaseBlackSpot from './disease-blackspot';
import DiseaseAphids from './disease-aphids';
import Healthy from './healthy';

function HomeCapture() {
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    let confidence = 0;
    const API_URL = process.env.REACT_APP_API_URL || "https://legal-tammi-student0617-c9760f79.koyeb.app";


    const videoConstraints = {
        width: 600,  
        height: 400, 
        facingMode: "environment" 
    };

    const sendFile = async (imageToSend) => {
        let formData = new FormData();
        formData.append("file", imageToSend);

        setIsLoading(true);
        try {
            const res = await axios.post("https://legal-tammi-student0617-c9760f79.koyeb.app/predict", formData);
            setData(res.data);
        } catch (error) {
            alert('Error during prediction');
        } finally {
            setIsLoading(false);
        }
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPreview(imageSrc);

        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => sendFile(blob));
    }, [webcamRef]);

    const clearData = () => {
        setData(null);
        setPreview(null);
    };

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    const renderContent = () => {
        switch (data.class) {
            case 'Black Spot':
                return <DiseaseBlackSpot/>;
            case 'Melanose':
                return <DiseaseMelanose/>;
            case 'Canker':
                return <DiseaseCanker/>;
            case 'Greening':
                return <DiseaseGreening/>;
            case 'Aphids':
                return <DiseaseAphids/>;
            case 'Healthy':
                return <Healthy/>;
            default:
                return <p>The system can't recognized the image.</p>;
        }
    };

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className="app">
            <SideBar page="home" />
            <div className="content">
                <h2>Capture Image</h2>
                <p1>Capture an image of a lemon leaf directly from your camera for disease detection and treatment advice. 
                Easily track and save your diagnosis history for future reference.</p1>
                

                <div className="predictionContainer">
                    <div className="chooseFileDiv">
                        {!preview && <button className="chooseFile" onClick={capture}>Capture</button>}
                        <button className='chooseFile' onClick={clearData}>Clear</button>
                        <button className='chooseFile' onClick={handleHome}>Go back to Home</button>
                    </div>

                    <div className="previewContainer">
                        {!preview &&<Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints} 
                        />}
                        {preview && <img src={preview} alt="Captured Preview" className="previewPhoto" />}
                        {data && (
                            <div className="predictionText">
                                <h1>Disease: </h1>
                                {renderContent()}
                            </div>
                        )} 
                    </div>

               
                </div>
                
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
}

export default HomeCapture;
