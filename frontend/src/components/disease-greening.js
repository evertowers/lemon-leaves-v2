import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/app.css';

const DiseaseGreening = () => {
  return (
    <div className="app">
        <div className="diseaseContent">
            <h1>Symptoms: </h1>
            <ul>
            <li><p3>Yellowing of leaves along the veins.</p3></li>
            <li><p3>Small, misshapen, bitter fruits.</p3></li>
            <li><p3>Premature fruit drop and overall tree decline.</p3></li>
            </ul>
            
        
            <h1>Treatment: </h1>
            <ul>
              <li><p3>No cure exists, but infected trees should be removed to prevent the spread of the disease.</p3></li>
              <li><p3>Control the Asian citrus psyllid, which spreads the disease, using insecticides.</p3></li>
            </ul>
            
            <h1>Recommendations: </h1>
            <ul></ul>
            <li><p3>Monitor trees regularly for signs of psyllids and infection.</p3></li>
            <li><p3>Implement biological control by introducing natural predators of the psyllid.</p3></li>
            <li><p3>Plant certified disease-free nursery stock.</p3></li>

            <h1>Organic Treatments: </h1>
            <ul>
            <li><p>Healthy Soil: Ensure your soil is rich in organic matter. Use compost or well-rotted manure to enhance soil fertility and promote healthy roots.</p></li>
            <li><p>Fertilization: Use organic fertilizers like fish emulsion or seaweed extract to provide essential nutrients. Balanced nutrition can help strengthen the plant's resistance.</p></li>
            <li><p>Insect Management: Citrus greening is spread by the Asian citrus psyllid. Use insecticidal soap or neem oil to control these pests. Regularly check for signs of infestation.</p></li>
            <li><p>Remove Infected Plant Material: Prune and remove any infected branches or leaves to help slow the spread of the disease.</p></li>
            <li><p>Mulching: Apply organic mulch around the base of your trees to retain moisture, suppress weeds, and improve soil health.</p></li>
            <li><p>Watering Practices: Water deeply but infrequently to encourage deep root growth, which can help the plant withstand stress.</p></li>
            <li><p>Companion Planting: Some plants can attract beneficial insects or deter pests. Consider planting herbs or flowers that support beneficial insect populations.</p></li>
            <li><p>Regular Monitoring: Keep an eye on your plants for any signs of distress or pests, and act quickly to address any issues.</p></li>
        </ul>
        <br></br>
        <br></br>

        </div>
    </div>
  );
};

export default DiseaseGreening;
