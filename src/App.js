import './App.css';
import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import Device from './components/Device';

function App() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const getLocalDevices = async () => {
            const localDevices = await window.electronAPI.getLocalDevices();
            setDevices(localDevices);
        };

        getLocalDevices();
    }, []);

    const buildDeviceList = () => {
        var jsx = "";

        if(devices.length) {
            const renderedDeviceList = devices.map((device) => {
                return(<Device device={{name: device.name, ip: device.ip, mac: device.mac, awake: true}}/>);
            });

            jsx = (
                <div className="deviceList">
                    {renderedDeviceList}
                </div>
            )
        }
        else {
            jsx = (
                <div className="userMessage">
                    <p>Press the '+' to discover new devices.</p>
                </div>
            );
        }

        return jsx;
    };

    return (
        <div className="App">
            <NavBar className="App-header" pageTitle="xWOL" leftNav="foo" rightNav="plus" />
            <div className="App-content">
                {buildDeviceList()}
            </div>
        </div>
    );
}

export default App;
