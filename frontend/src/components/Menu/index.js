import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// An inline style to clear the text-decoration for the <Link> element.
const clearDecoration = {
    textDecoration: 'none'
}

const handleLogout = () => {
    // TODO: Logout Logic
    localStorage.removeItem('token'); // remove the user account from Local Storage (refactor)
}

const isAdmin = true; // boolean to check whether the user has admin privilege (refactor logic)

const Menu = () => {
    return (
        <div className='container-menu'>
            <div className='container-menuTitle'>
                <h2>
                    <span>A</span>
                    <i className='fas fa-calendar-alt'></i>
                    <span>L</span>
                </h2>
            </div>
            <ul>
                <Link to='/dashboard' style={clearDecoration}>
                    <li><p><i className='fas fa-home'></i><span>dashboard</span></p></li>
                </Link>
                {isAdmin &&
                    <Link to='/requests' style={clearDecoration}>
                        <li><p><i className='fas fa-location-arrow'></i><span>requests</span></p></li>
                    </Link>
                }
                <Link to='/' style={clearDecoration}>
                    <li><p><i className="fas fa-user-plus"></i><span>Switch user</span></p></li>
                </Link>
                {/* if isAdmin is set to true, the Requests Link will be visible to the user */}
                <Link to='/' onClick={handleLogout} style={clearDecoration}>
                    <li><p><i className='fas fa-sign-out-alt'></i><span>logout</span></p></li>
                </Link>
            </ul>
        </div>
    )
}

export default Menu;