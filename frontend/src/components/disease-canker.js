import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/app.css';

const DiseaseMelanose = () => {
  return (
    <div className="app">
        <div className="diseaseContent">
            <h1>Symptoms: </h1>
            <ul>
              <li><p3>Small, raised dark brown spots on leaves, twigs, and fruit.</p3></li>
              <li><p3>Dry, rough fruit skin with reduced commercial value.</p3></li>
            </ul>

            <h1>Treatment: </h1>
            <ul>
              <li><p3>Spray fungicides, particularly copper-based, during early fruit development.</p3></li>
              <li><p3>Prune dead wood from the tree to reduce sources of the fungus.</p3></li>
            </ul>

            <h1>Recommendations: </h1>
            <ul>
              <li><p3>Regular pruning to improve air circulation and reduce moisture buildup.</p3></li>
              <li><p3>Remove and destroy dead plant material to prevent spore production.</p3></li>
            </ul>

            <h1>Organic Treatments: </h1>
            <ul>
              <li><p>Neem Oil: Neem oil is a natural pesticide that can help control fungal infections. Mix it with water according to package instructions and spray on affected leaves.</p></li>
              <li><p>Copper-Based Fungicides: While some copper fungicides are organic, check for certified organic options. Apply according to the label instructions.</p></li>
              <li><p>Baking Soda Spray: Mix 1 tablespoon of baking soda with 1 gallon of water and a few drops of dish soap. Spray on the affected areas to help inhibit fungal growth.</p></li>
              <li><p>Garlic Spray: Blend a few cloves of garlic with water and let it steep overnight. Strain and spray the mixture on the leaves. Garlic has natural antifungal properties.</p></li>
              <li><p>Horticultural Soap: Insecticidal soaps can help control various pests and may support plant health. Follow the instructions for application.</p></li>
              <li><p>Proper Hygiene: Remove and dispose of infected leaves to reduce the spread of the disease. Clean tools and pots to avoid contamination.</p></li>
              <li><p>Cultural Practices: Ensure good air circulation around the plants, avoid overhead watering, and maintain proper nutrition to strengthen plant resistance.</p></li>
          </ul>
          <br></br>
          <br></br>

        </div>
    </div>
  );
};

export default DiseaseMelanose;
