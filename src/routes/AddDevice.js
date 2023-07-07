import {React, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const AddDevice = () => {
    const [deviceName, setDeviceName] = useState("");
    const [deviceIP, setDeviceIP] = useState("");
    const [deviceMAC, setDeviceMAC] = useState("");
    const [isValidIP, setIsValidIP] = useState(false);
    const [isValidMAC, setIsValidMAC] = useState(false);
    const location  = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const rcvdDevice = location.state.data;
        // Clear out the name if it's unkonwn
        if(rcvdDevice.name === '?') {
            rcvdDevice.name = '';
        }

        setDeviceName(rcvdDevice.name);
        setDeviceIP(rcvdDevice.ip);
        setDeviceMAC(rcvdDevice.mac);
        setIsValidIP(isValidIPv4Address(rcvdDevice.ip));
        setIsValidMAC(isValidMacAddress(rcvdDevice.mac));
    }, [location.state.data]);

    const isValidMacAddress = (macAddress) => {
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return macRegex.test(macAddress);
    }

    const isValidIPv4Address = (ipAddress) => {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ipAddress);
    }

    const handleIPChange = (e) => {
        setDeviceIP(e.target.value);
        setIsValidIP(isValidIPv4Address(e.target.value));
    };

    const handleMACChange = (e) => {
        setDeviceMAC(e.target.value)
        setIsValidMAC(isValidMacAddress(e.target.value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct a device object
        const device = {
            name: deviceName,
            ip: deviceIP,
            mac: deviceMAC
        };

        if(!isValidIPv4Address(device.ip)) {
            setIsValidIP(isValidIPv4Address(device.ip));
            return;
        }

        if(!isValidMacAddress(device.mac)) {
            setIsValidMAC(isValidMacAddress(device.mac));
            return;
        }

        console.log(`Submitting device: ${device.ip}`);
        // Use the electron API to send the device object to the main process
        await window.electronAPI.addDevice(device);

        navigate('/');
    }

    return (
        <div className="AddDevice-form">
            <div className="AddDevice-input">
                <p className="AddDevice-input-label">Device name</p>
                <input className="AddDevice-input-field"
                    type="text"
                    placeholder="Device name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                />
            </div>
            <div className="AddDevice-input">
                <p className="AddDevice-input-label">IPV4 address</p>
                <input className={`AddDevice-input-field ${isValidIP ? '' : 'AddDevice-invalid'}`}
                    type="text"
                    placeholder="IPV4 address"
                    value={deviceIP}
                    onChange={handleIPChange}
                />
            </div>
            <div className="AddDevice-input">
                <p className="AddDevice-input-label">MAC address</p>
                <input className={`AddDevice-input-field ${isValidMAC ? '' : 'AddDevice-invalid'}`}
                    type="text"
                    placeholder="MAC address"
                    value={deviceMAC}
                    onChange={handleMACChange}
                />
            </div>
            <button className="AddDevice-button"
                type='submit'
                onClick={handleSubmit}
            >Save</button>
        </div>
    );
}

export default AddDevice;