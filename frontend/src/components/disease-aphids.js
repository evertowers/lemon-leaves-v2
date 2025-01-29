import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/app.css';

const DiseaseAphids = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [newTreatment, setNewTreatment] = useState(''); // State for new treatment

  const fetchReports = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/treatments/aphids');
      setReports(response.data);
    } catch (err) {
      setError('Error fetching reports');
    } finally {
      const timer = setTimeout(() => {
        setLoading(false); // Stop loading after 1 second
      }, 500);
    }
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
      const response = await axios.put(`http://localhost:8000/update/aphids`, {
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
        <h2>APHIDS</h2>
        <h3>(DRY SEASON)</h3>
        <p3>Aphids spread quickly in hot weather due to:</p3>
        <li><p3>Rapid population growth and reproduction</p3></li>
        <li><p3>Increased aphid activity in high temperatures</p3></li>
        <li><p3>Easy transfer between plants</p3></li>

        <h1>Symptoms: </h1>
        <ul>
          <li><p3>Aphids feed on the sap of leaves, which can cause the leaves to curl, wrinkle, or become misshapen.</p3></li>
          <li><p3>Leaves may turn yellow due to the aphids' feeding, as they extract essential nutrients, weakening the plant.</p3></li>
          <li><p3>Aphids secrete a sugary substance called honeydew, which can leave the leaves and nearby surfaces sticky. Honeydew also attracts ants and can lead to the growth of sooty mold (a black fungal coating).</p3></li>
        </ul>

        <h1>Treatment: </h1>
        {isEditing ? (
          <div className="editingDiv">
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
            <ul>
            <li><p3>Release beneficial insects like ladybugs, lacewings, and parasitic wasps that feed on aphids. These predators are effective at controlling aphid populations naturally.</p3></li>
            <li><p3>Spray neem oil, which acts as an insecticide and repellent, disrupting the aphid's growth and reducing their ability to reproduce.</p3></li>
            <li><p3>Use soap-based sprays that suffocate aphids. This treatment is effective without being harmful to plants, humans, or pets. Spray on infested areas, covering both the tops and bottoms of leaves.</p3></li>
            <li><p3>Keep your lemon trees healthy through proper watering, fertilization, and pruning. Healthy trees are more resilient to aphid damage.</p3></li>
            <li><p3>Use pyrethrin sprays for severe infestations. They target aphids directly but should be used sparingly to minimize harm to beneficial insects.</p3></li>
            <li><p3>Apply systemic insecticides to the soil or foliage, which the tree absorbs, making its sap toxic to aphids. Be cautious, as these can affect pollinators.</p3></li>
            </ul>

            <h1>Organic Treatments: </h1>
            <ul>
              <li><p3>Neem Oil: Neem oil is a natural insecticide and fungicide that disrupts the life cycle of aphids, preventing them from feeding and reproducing. Mix neem oil with water (according to product instructions) and spray it on the affected leaves, especially on the undersides.</p3></li>
              <li><p3>Insecticidal Soap: Organic soap sprays kill aphids by breaking down their outer protective layer. You can buy insecticidal soap or make your own by mixing 1-2 teaspoons of mild liquid soap with 1 quart of water. Spray directly on aphids.</p3></li>
              <li><p3>Garlic or Onion Spray: Garlic and onion are natural repellents for aphids. Crush a few garlic cloves or onions, steep them in water for several hours, strain, and spray the liquid on your lemon tree. This will repel aphids without harming the tree.</p3></li>
              <li><p3>Homemade Pepper Spray: A spicy pepper spray can deter aphids. Mix 1 tablespoon of cayenne pepper or chili powder with water and a few drops of mild liquid soap. Spray on infested areas.</p3></li>
              <li><p3>Essential Oils: Essential oils like peppermint, rosemary, or clove can act as aphid repellents. Mix a few drops with water and spray on the leaves to drive aphids away.</p3></li>
              <li><p3>Companion Planting: Plant aphid-repelling plants like garlic, chives, basil, or marigolds near your lemon trees. These plants naturally repel aphids and can help reduce infestations.</p3></li>
              <li><p3>Diatomaceous Earth: Diatomaceous earth is a natural powder made from fossilized algae. When sprinkled on and around the lemon tree, it can kill aphids by dehydrating them. Be sure to use food-grade diatomaceous earth.</p3></li>
              <li><p3>Beneficial Insects: Introduce natural predators such as ladybugs, lacewings, or parasitic wasps into your garden. These insects feed on aphids and can help keep their population under control.</p3></li>
              <li><p3>Banana Peel: Place chopped banana peels around the base of your lemon tree. Aphids dislike the ethylene gas emitted by the peels, which may deter them.</p3></li>
              <li><p3>Water Spray: A simple blast of water from a hose can dislodge aphids from your lemon tree. Spray the leaves thoroughly, especially the undersides, to wash off aphids.</p3></li>
            </ul>
          <br></br>
          <br></br>
        </div>
    </div>
  );
};

export default DiseaseAphids;
