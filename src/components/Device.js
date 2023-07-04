import React from 'react';
import FeatherIcon from 'feather-icons-react';

const Device = ({device}) => {
    const powerColor = !device.awake ? 'black' : '#75757560';
    return(
        <div className="Device">
            <span className={`Device-status ${device.awake ? 'connected' : 'disconnected'}`}></span>
            <p className="Device-name">{device.name}</p>
            <FeatherIcon title="wake" style={{cursor:'pointer', width:'16px', color:powerColor}} icon='power' />
        </div>
    );
};

export default Device;