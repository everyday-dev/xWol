import React, {useState, useEffect} from 'react';
import {DiscoveredDevice} from '../components/Device';
import '../css/App.css';
import '../css/Discover.css'

const Discover = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const getLocalDevices = async () => {
            const localDevices = await window.electronAPI.getLocalDevices();
            setDevices(localDevices);
        };

        getLocalDevices();
    }, []);

    const deviceAddCallback = (device) => {
        console.log(device);
    }

    const buildDeviceList = () => {
        var jsx = "";

        if(devices.length > 0) {
            const renderedDeviceList = devices.map((device) => {
                return(<DiscoveredDevice key={device.ip} device={device} onAdd={deviceAddCallback}/>);
            });

            jsx = (
                <div className="DiscoverList">
                    {renderedDeviceList}
                </div>
            )
        }
        else {
            jsx = (
                <div className="userMessage">
                    <p>No devices found on the local network.</p>
                    <p>Please check your network settings.</p>
                </div>
            );
        }

        return jsx;
    };

    return (
        <div className="Discover">
            {buildDeviceList()}
        </div>
    );
};

export default Discover;