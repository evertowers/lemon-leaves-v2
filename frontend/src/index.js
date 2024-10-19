import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional: If you have a CSS file
import App from './App';  // Ensure you have an `App.js` component or modify this line

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
