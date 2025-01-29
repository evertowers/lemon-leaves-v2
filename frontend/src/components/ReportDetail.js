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
import PhotoZoom from './PhotoZoom';


function ReportDetail() {
    const location = useLocation();
    const { disease, imagePath } = location.state || {}; 
    const imagePath2 = "https://raw.githubusercontent.com/evertowers/leaf-disease-images/main/" + imagePath;
    const renderContent = () => {
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
                <div className="photoZoomDiv"><PhotoZoom src={imagePath2} alt="Selected Preview"/></div>
                <div className="predictionText">
                    <h1>Disease: </h1>
                    {renderContent()}   
                </div>                      
            </div>
            </div>
        </div>
        
    );
}

export default ReportDetail;
