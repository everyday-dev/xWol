import {React, useEffect, useState} from 'react';
import FeatherIcon from 'feather-icons-react';
import '../css/Device.css'
import {Link} from 'react-router-dom';
import Tooltip from './Tooltip';

const ConfiguredDevice = ({device}) => {
    const name = (device.name === '?') ? device.ip : device.name;
    const [awake, setAwake] = useState(device.awake);
    const [querying, setQuerying] = useState(true);

    useEffect(() => {
        const isDeviceAwake = async () => {
            const res = await window.electronAPI.isDeviceAwake(device.ip, 30);
            setAwake(res);
            setQuerying(false);
        };

        isDeviceAwake();

        const intervalId = setInterval(() => {
            isDeviceAwake();
        }, 10000);

        return () => clearInterval(intervalId);
    });

    const statusJsx = () => {
        if(querying) {
            return(
                <div className='Device-status'>
                    <FeatherIcon className='Device-loader' icon='loader' />
                </div>
            )
        }
        else {
            return(
                <div className='Device-status'>
                    <span className={`Device-dot ${awake ? 'connected' : 'disconnected'}`}></span>
                </div>
            )
        }
    }

    const canWake = () => {
        return(!awake && !querying);
    }
    return(
        <div className="Device">
            {statusJsx()}
            <div className="Device-info">
                <p className="Device-name">{name}</p>
                <p className="Device-netInfo">{device.mac.toUpperCase()}</p>
            </div>
            <div className="Device-action">
                <Tooltip text="Edit">
                    <FeatherIcon style={{cursor:'pointer', marginRight: '10px', width:'18px', color:'black'}} icon='settings' />
                </Tooltip>
                <Tooltip text="Wake">
                    <FeatherIcon style={{cursor:'pointer', width:'22px', color:(canWake() ? 'black' : '#75757550') }} icon='activity' />
                </Tooltip>
            </div>
        </div>
    );
};

const DiscoveredDevice = ({device}) => {
    const name = (device.name === '?') ? device.ip : device.name;

    return(
        <div className="Device">
            <div className="Device-info">
                <p className="Device-name">{name}</p>
                <p className="Device-netInfo">{device.mac.toUpperCase()}</p>
            </div>

            <Link to='/add' state={{data:device}}>
                <FeatherIcon className="Device-action" style={{cursor:'pointer', width:'16px', color:'black'}} icon='plus' />
            </Link>
        </div>
    );
}

export {ConfiguredDevice, DiscoveredDevice};