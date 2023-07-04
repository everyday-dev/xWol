import React from 'react';
import '../App.css';
import FeatherIcon from 'feather-icons-react';

const NavBar = ({className, pageTitle, leftNav, rightNav}) => {

    return(
        <div className='App-header navBar'>
            <FeatherIcon style={{cursor:'pointer'}} icon={leftNav} />
            <p>{pageTitle}</p>
            <FeatherIcon style={{cursor:'pointer'}} icon={rightNav} />
        </div>
    );
};

export default NavBar;