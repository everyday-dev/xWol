import React from 'react';
import FeatherIcon from 'feather-icons-react';
import '../css/Device.css'
import {Link} from 'react-router-dom';

const ConfiguredDevice = ({device}) => {
    const powerColor = !device.awake ? 'black' : '#75757560';
    const name = (device.name === '?') ? device.ip : device.name;

    return(
        <div className="Device">
            <span className={`Device-status ${device.awake ? 'connected' : 'disconnected'}`}></span>
            <div className="Device-info">
                <p className="Device-name">{name}</p>
                <p className="Device-netInfo">{device.mac.toUpperCase()}</p>
            </div>
            <FeatherIcon style={{cursor:'pointer', width:'16px', color:powerColor}} icon='plus' />
        </div>
    );
};

const DiscoveredDevice = ({device, onAdd}) => {
    const powerColor = !device.awake ? 'black' : '#75757560';
    const name = (device.name === '?') ? device.ip : device.name;

    return(
        <div className="Device">
            <div className="Device-info">
                <p className="Device-name">{name}</p>
                <p className="Device-netInfo">{device.mac.toUpperCase()}</p>
            </div>

            <Link to='/add' state={{data:device}}>
                <FeatherIcon className="Device-action" style={{cursor:'pointer', width:'16px', color:powerColor}} icon='plus' />
            </Link>
        </div>
    );
}

export {ConfiguredDevice, DiscoveredDevice};