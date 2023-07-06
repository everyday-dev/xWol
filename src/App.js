import './css/App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Discover from './routes/Discover';
import MyDevices from './routes/MyDevices';
import AddDevice from './routes/AddDevice';
import About from './routes/About';
import {Route, Routes} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className="App-content">
                <Routes>
                    <Route path="/" element={<MyDevices />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/add" element={<AddDevice />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
