import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/app.css';

const DiseaseError = () => {
  return (
    <div className="app">
        <div className="diseaseContent">
            <h2>ERROR</h2>
            <p3>Sorry, the system couldn't recognize the image. Please ensure that the uploaded image is a clear picture of a leaf.</p3>
        </div>
    </div>
  );
};

export default DiseaseError;