import React from 'react';
import '../css/Navbar.css';
import FeatherIcon from 'feather-icons-react';
import {Link, useLocation} from 'react-router-dom';

const backButton = (currentLocation) => {
    let to = '';
    let icon = '';

    switch(currentLocation) {
        case '/about':
        case '/add':
        case '/discover':
            to = '/';
            icon = 'arrow-left';
            break;

        case '/':
            to = '/about';
            icon = 'help-circle';
            break;

        default:
            break;
    }

    if(to !== '') {
        return(
            <Link to={to} className="Navbar-left">
                <FeatherIcon style={{cursor:'pointer'}} icon={icon} />
            </Link>
        )
    }
};

const actionButton = (currentLocation) => {
    let to = '';
    let icon = '';

    switch(currentLocation) {
        case '/':
            to = '/discover';
            icon = 'plus';
            break;

        case '/discover':
            to = '/discover';
            icon = 'refresh-cw';
            break;

        default:
            break;
    }

    if(to !== '') {
        return(
            <Link to={to} className="Navbar-right">
                <FeatherIcon style={{cursor:'pointer'}} icon={icon} />
            </Link>
        )
    }
};

const NavBar = () => {
    const currentLocation = useLocation().pathname;
    let pageTitle = '';

    switch(currentLocation) {
        case '/':
            pageTitle = 'xWOL';
            break;

        case '/discover':
            pageTitle = 'Discover';
            break;

        case '/add':
            pageTitle = 'Add Device';
            break;

        case '/about':
            pageTitle = 'About';
            break;

        default:
            break;
    }

    return(
        <div className='Navbar'>
            {backButton(currentLocation)}
            <p className="Navbar-title">{pageTitle}</p>
            {actionButton(currentLocation)}
        </div>
    );
};

export default NavBar;