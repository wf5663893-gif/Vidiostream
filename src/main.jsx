import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
const popScript =
  document.createElement("script");

popScript.src =
  "https://consumptionbackwardsentiments.com/4e/31/b8/4e31b8ac66e79e59740f73b86285ee72.js";

popScript.async = true;

document.body.appendChild(popScript);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
