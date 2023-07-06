import React from 'react';
import {useLocation} from 'react-router-dom';

const AddDevice = (props) => {
    const location = useLocation();
    const device = location.state.data;
    return (
        <p>{device.mac}</p>
    );
}

export default AddDevice;