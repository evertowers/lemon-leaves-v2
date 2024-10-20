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
              <li><p3>Copper Fungicides: Use organic-approved copper-based fungicides. Apply according to label instructions, especially during the early growth stage and when conditions are conducive to disease.</p3></li>
              <li><p3>Neem Oil: Neem oil can help control fungal infections. Mix it with water according to package directions and spray on affected leaves, ensuring good coverage.</p3></li>
              <li><p3>Baking Soda Spray: Mix 1 tablespoon of baking soda, 1 tablespoon of vegetable oil, and 1 gallon of water. Spray this solution on the leaves to help reduce fungal growth.</p3></li>
              <li><p3>Improve Air Circulation: Prune your trees to improve air flow around the foliage. Good air circulation can help reduce humidity and prevent fungal diseases.</p3></li>
              <li><p3>Proper Watering: Water at the base of the plants to avoid wetting the leaves. Water in the morning to allow any moisture on the leaves to dry quickly.</p3></li>
              <li><p3>Remove Infected Material: Regularly inspect your plants and remove any infected leaves or fruit to minimize the spread of the disease.</p3></li>
              <li><p3>Healthy Soil Practices: Use organic compost and fertilizers to enhance soil health, which can help strengthen the plant's immune system.</p3></li>
              <li><p3>Mulching: Apply organic mulch around the base of your trees to retain moisture, suppress weeds, and improve soil quality.</p3></li>
              <li><p3>Monitor and Manage Pests: Since citrus melanose can be associated with pest issues, use organic methods like neem oil or insecticidal soap to control any insect infestations.</p3></li>
          </ul>
          <br></br>
          <br></br>
        </div>
    </div>
  );
};

export default DiseaseMelanose;
