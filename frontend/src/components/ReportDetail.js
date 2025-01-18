// ReportDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './css/app.css';
import SideBar from './sidebar';
import DiseaseGreening from './disease-greening';
import DiseaseCanker from './disease-canker';
import DiseaseMelanose from './disease-melanose';
import DiseaseBlackSpot from './disease-blackspot';
import DiseaseAphids from './disease-aphids';
import Healthy from './healthy';


function ReportDetail() {
    const location = useLocation();
    const { disease, imagePath } = location.state || {}; 
    const githubPath = "https://raw.githubusercontent.com/evertowers/leaf-disease-images/main/Melanose_95fc912e-727d-4572-9c43-73d5f6753914.jpg";
    const imagePath2 = githubPath + imagePath;
    const renderContent = () => {
        <p>im = {imagePath}</p>
        switch (disease) {
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
            default:
                return <p>The system can't recognized the image.</p>;
        }
    };

    const handleHome = () => {
        navigate('/home');
    }


    return (
        <div className="app">
            <SideBar page="dashboard"/>
            <div className="content">
            <h2>Report Detail</h2>
            <div className="previewContainer">
                <img src={imagePath2} alt={imagePath} className="previewPhoto" />
                <div className="predictionText">
                    <h1>Disease: {imagePath} </h1>
                    {renderContent()}   
                </div>                      
            </div>
            </div>
        </div>
        
    );
}

export default ReportDetail;
