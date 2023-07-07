import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
// import 'semantic-ui-css/semantic.min.css'
import './css/index.css';
import './css/App.css';
import './css/Device.css';
import './css/Discover.css';
import './css/Navbar.css';
import './css/AddDevice.css';
import './css/MyDevices.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
