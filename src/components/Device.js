import React from 'react';
import FeatherIcon from 'feather-icons-react';

const Device = ({device}) => {
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

export default Device;