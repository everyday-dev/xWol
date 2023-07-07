import {React, useEffect, useState} from 'react';
import {ConfiguredDevice} from '../components/Device';

const MyDevices = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const getDevices = async () => {
            const devices = await window.electronAPI.getConfiguredDevices();
            setDevices(devices);
        };

        getDevices();
    }, []);

    const buildDeviceList = () => {
        let jsx = '';

        if(devices.length > 0) {
            console.log(devices);
            let deviceList = devices.map(device => {
                return (
                    <ConfiguredDevice key={device.mac} device={device} />
                );
            });

            jsx = (
                <div className="MyDevicesList">
                    {deviceList}
                </div>
            );
        }
        else {
            jsx = <p>No devices configured</p>;
        }

        return jsx;
    }

    return (
        <div className="MyDevices">
            {buildDeviceList()}
        </div>
    );
}

export default MyDevices;