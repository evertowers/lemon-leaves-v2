import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/app.css';

const DiseaseBlackSpot = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [newTreatment, setNewTreatment] = useState(''); // State for new treatment
  

  const fetchReports = async () => {
      const token = localStorage.getItem('token');
      try {

          const response = await axios.get('http://localhost:8000/treatments/black-spot');
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

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTreatment(reports.treatment); // Pre-fill the treatment for editing
  };

  const handleUpdateTreatment = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/update/black-spot`, {
        treatment: newTreatment,
      });
      // Update the treatment in the reports state after successful update
      setReports(prevReports => ({
        ...prevReports,
        treatment: newTreatment,
      }));
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError('Error updating treatment');
    }
  };
  return (
    <div className="app">
        <div className="diseaseContent">
            <h2>BLACK SPOT</h2>
            <h3>(RAINY SEASON)</h3>
            <p3>Black Spot is a plant disease caused by fungi Diplocarpon rosae and Phyllosticta spp. 
              It's more damaging during the rainy season due to easier fungal spread through rainwater.</p3>

            <h1>Symptoms: </h1><ul>
            <li><p3>Yellow or brownish blisters on the underside of leaves.</p3></li>
            <li><p3>Leaves may become greasy, leading to defoliation.</p3></li>
            <li><p3>Premature fruit drop and reduced fruit quality.</p3></li>
            </ul>

            <h1>Treatment: </h1>
            {isEditing ? (
              <div>
                <textarea
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                />
                <button onClick={handleUpdateTreatment}>Save Treatment</button>
              </div>
            ) : (
              <ul><li><p3>{reports.treatment}</p3></li></ul>
            )}
            
            {!isEditing && (
              <button onClick={handleEditClick} className="chooseFile">Edit Treatment</button>
            )}

            
            <h1>Recommendations: </h1><ul>
            <li><p3>Remove and destroy fallen leaves to prevent reinfection.</p3></li>
            <li><p3>Use organic mulching to reduce soil-borne spores.</p3></li>
            <li><p3>Apply fungicide during the wet season to prevent outbreaks.</p3></li></ul>

            <h1>Organic Treatments: </h1><ul>
            <li><p3>Copper Fungicides: Use certified organic copper-based fungicides. Apply them according to the label instructions, particularly during the early stages of disease development.</p3></li>
            <li><p3>Neem Oil: This natural pesticide can help control fungal infections. Mix it with water as directed and spray it on affected areas.</p3></li>
            <li><p3>Baking Soda Solution: Mix 1 tablespoon of baking soda, 1 tablespoon of vegetable oil, and 1 gallon of water. Spray this solution on the affected leaves to help inhibit fungal growth.</p3></li>
            <li><p3>Horticultural Oils: These oils can help control fungal pathogens. Be sure to apply during cooler parts of the day to avoid leaf burn.</p3></li>
            <li><p3>Remove Infected Leaves: Regularly inspect your plants and remove any infected leaves to minimize the spread of the fungus.</p3></li>
            <li><p3>Improve Air Circulation: Prune your citrus trees to ensure good air flow, which can help reduce humidity around the leaves and discourage fungal growth.</p3></li>
            <li><p3>Water Management: Avoid overhead watering and water in the morning to reduce leaf wetness, which can promote fungal diseases.</p3></li>
            <li><p3>Mulching: Apply organic mulch around the base of the trees to help retain moisture and improve soil health.</p3></li>
            <li><p3>Healthy Soil Practices: Ensure your trees are getting adequate nutrition by using compost or organic fertilizers to strengthen their immune systems.</p3></li>
            </ul>
          <br></br>
          <br></br>

        </div>
    </div>
  );
};

export default DiseaseBlackSpot;
