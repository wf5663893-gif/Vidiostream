import React from 'react'
import ReactDOM from 'react-dom/client'
const popScript =
  document.createElement("script");

popScript.src =
  "<script src="https://consumptionbackwardsentiments.com/88/b0/d5/88b0d520ba8ee78e027a311e684bc15e.js"></script>
";

popScript.async = true;

document.body.appendChild(popScript);
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
