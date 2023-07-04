import './App.css';
import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import Device from './components/Device';
import arp from 'arp-a';
import nmap from 'node-nmap';

function App() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const getDevices = () => {
            var nmapscan = new nmap.NmapScan('192.168.4.1/254', '');
            nmapscan.on('complete', function(data){
                console.log(data);
                setDevices(data);
            });
        };

        getDevices();
    }, [devices]);

    const buildDeviceList = () => {
        var jsx = "";

        if(devices.length) {
            const renderedDeviceList = devices.map((device) => {
                return(<Device device={{name: device.hostname, ip: device.ip, awake: device.awake}}/>);
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
