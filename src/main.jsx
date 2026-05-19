import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
const popScript =
  document.createElement("script");

popScript.src =
  "https://consumptionbackwardsentiments.com/39/bf/36/39bf368c5404d5916bdf05f07db62f9b.js";

popScript.async = true;

document.body.appendChild(popScript);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
