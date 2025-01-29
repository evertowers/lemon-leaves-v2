import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/app.css';

const DiseaseGreening = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [newTreatment, setNewTreatment] = useState(''); // State for new treatment
  
  const fetchReports = async () => {
      const token = localStorage.getItem('token');
      try {

          const response = await axios.get('http://localhost:8000/treatments/greening');
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
      const response = await axios.put(`http://localhost:8000/update/greening`, {
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
            <h2>GREENING</h2>
            <h3>(DRY SEASON)</h3>
            <p3>Citrus Greening spreads faster during summer due to insects that transmit the bacteria.</p3>
            
            <h1>Symptoms: </h1>
            <ul>
            <li><p3>Yellowing of leaves along the veins.</p3></li>
            <li><p3>Small, misshapen, bitter fruits.</p3></li>
            <li><p3>Premature fruit drop and overall tree decline.</p3></li>
            </ul>
        
            <h1>Treatment: </h1>
            {isEditing ? (
              <div>
                <textarea
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(e.target.value)}
                />
                <button onClick={handleUpdateTreatment} className="chooseFile">Save Treatment</button>
              </div>
            ) : (
              <ul><li><p3>{reports.treatment}</p3></li></ul>
            )}
            
            {!isEditing && (
              <button onClick={handleEditClick} className="chooseFile">Edit Treatment</button>
            )}
            
            <h1>Recommendations: </h1>
            <ul></ul>
            <li><p3>Monitor trees regularly for signs of psyllids and infection.</p3></li>
            <li><p3>Implement biological control by introducing natural predators of the psyllid.</p3></li>
            <li><p3>Plant certified disease-free nursery stock.</p3></li>

            <h1>Organic Treatments: </h1>
            <ul>
            <li><p3>Healthy Soil: Ensure your soil is rich in organic matter. Use compost or well-rotted manure to enhance soil fertility and promote healthy roots.</p3></li>
            <li><p3>Fertilization: Use organic fertilizers like fish emulsion or seaweed extract to provide essential nutrients. Balanced nutrition can help strengthen the plant's resistance.</p3></li>
            <li><p3>Insect Management: Citrus greening is spread by the Asian citrus psyllid. Use insecticidal soap or neem oil to control these pests. Regularly check for signs of infestation.</p3></li>
            <li><p3>Remove Infected Plant Material: Prune and remove any infected branches or leaves to help slow the spread of the disease.</p3></li>
            <li><p3>Mulching: Apply organic mulch around the base of your trees to retain moisture, suppress weeds, and improve soil health.</p3></li>
            <li><p3>Watering Practices: Water deeply but infrequently to encourage deep root growth, which can help the plant withstand stress.</p3></li>
            <li><p3>Companion Planting: Some plants can attract beneficial insects or deter pests. Consider planting herbs or flowers that support beneficial insect populations.</p3></li>
            <li><p3>Regular Monitoring: Keep an eye on your plants for any signs of distress or pests, and act quickly to address any issues.</p3></li>
        </ul>
        <br></br>
        <br></br>

        </div>
    </div>
  );
};

export default DiseaseGreening;
