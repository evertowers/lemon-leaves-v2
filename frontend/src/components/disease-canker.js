import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/app.css';

const DiseaseCanker = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
      const token = localStorage.getItem('token');
      try {

          const response = await axios.get('http://localhost:8000/treatments/canker');
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
  return (
    <div className="app">
        <div className="diseaseContent">
            <h2>CANKER</h2>
            <h3>(RAINY SEASON)</h3>
            <p3>Canker is more damaging during the rainy season because the bacteria spreads more easily through rainwater and wind.</p3>

            <h1>Symptoms: </h1>
            <ul>
              <li><p3>Small, raised dark brown spots on leaves, twigs, and fruit.</p3></li>
              <li><p3>Dry, rough fruit skin with reduced commercial value.</p3></li>
            </ul>


            <h1>Treatment: </h1>
            <ul><li><p3>{reports.treatment}</p3></li></ul>

            <h1>Recommendations: </h1>
            <ul>
              <li><p3>Regular pruning to improve air circulation and reduce moisture buildup.</p3></li>
              <li><p3>Remove and destroy dead plant material to prevent spore production.</p3></li>
            </ul>

            <h1>Organic Treatments: </h1>
            <ul>
              <li><p3>Neem Oil: Neem oil is a natural pesticide that can help control fungal infections. Mix it with water according to package instructions and spray on affected leaves.</p3></li>
              <li><p3>Copper-Based Fungicides: While some copper fungicides are organic, check for certified organic options. Apply according to the label instructions.</p3></li>
              <li><p3>Baking Soda Spray: Mix 1 tablespoon of baking soda with 1 gallon of water and a few drops of dish soap. Spray on the affected areas to help inhibit fungal growth.</p3></li>
              <li><p3>Garlic Spray: Blend a few cloves of garlic with water and let it steep overnight. Strain and spray the mixture on the leaves. Garlic has natural antifungal properties.</p3></li>
              <li><p3>Horticultural Soap: Insecticidal soaps can help control various pests and may support plant health. Follow the instructions for application.</p3></li>
              <li><p3>Proper Hygiene: Remove and dispose of infected leaves to reduce the spread of the disease. Clean tools and pots to avoid contamination.</p3></li>
              <li><p3>Cultural Practices: Ensure good air circulation around the plants, avoid overhead watering, and maintain proper nutrition to strengthen plant resistance.</p3></li>
          </ul>
          <br></br>
          <br></br>

        </div>
    </div>
  );
};

export default DiseaseCanker;
