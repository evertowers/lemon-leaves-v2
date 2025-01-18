import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import SideBar from './sidebar';
import DiseaseGreening from './disease-greening';
import DiseaseCanker from './disease-canker';
import DiseaseMelanose from './disease-melanose';
import DiseaseBlackSpot from './disease-blackspot';
import DiseaseAphids from './disease-aphids';
import Healthy from './healthy';
import Error from './disease-error';


function HomeUpload() {
    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState(null);
    const [preview, setPreview] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');

    const [image, setImage] = useState(false);
    const navigate = useNavigate();
    let confidence = 0;

    const sendFile = async (imageToSend) => {
        const formData = new FormData();
        formData.append("file", imageToSend);
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/predict', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(res.data);
        } catch (error) {
            alert('Error during prediction');
        } finally {
            setIsLoading(false);
        }
    };
    

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
        if (preview) {
            sendFile(selectedFile);
        }
    }, [preview]);

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    const renderContent = () => {
        switch (data.class) {
            case 'Black spot':
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
            case 'Unknown':
                return <Error/>;
        }
    };

    const handleHome = () => {
        navigate('/home');
    }

    const clearData = () => {
        setData(null);
        setPreview(null);
    };

    return (
<div className="app">
            <SideBar page="home"/>
            <div className="content">
                <h2>Upload Image</h2>
                <p1>Upload an image of a lemon leaf or disease detection and treatment advice. 
                    Easily track and save your diagnosis history for future reference. </p1>
            
                <div className="predictionContainer">
                        <div className="chooseFileDiv">
                            <label className="chooseFile"><input 
                                type="file" 
                                accept="image/*" 
                                onChange={onSelectFile} 
                                hidden
                            />Choose File</label>
                            <button className='clearData' onClick={clearData}>Clear</button>
                            <button onClick={handleHome} className="chooseFile">Go back to Home</button>
                        </div>
                        <div className="previewContainer">
                            {preview && <img src={preview} alt="Selected Preview" className="previewPhoto" />}
                            {data && (
                            <div className="predictionText">
                                <h1>Disease: </h1>
                                {renderContent()}
                            </div>)}
                            {isLoading && <p>Loading...</p>} 
                            
                        </div>
                </div>
            </div>
        </div>
    );
}

export default HomeUpload;
