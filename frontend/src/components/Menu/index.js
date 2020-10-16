import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// An inline style to clear the text-decoration for the <Link> element.
const clearDecoration = {
    textDecoration: 'none'
}

const Menu = () => {
    return (
        <div className='container-menu'>
            <h2>attendor-lite</h2>
            <ul>
                <Link style={clearDecoration} to='/'>
                    <li><p><i className='fas fa-home'></i>dashboard</p></li>
                </Link>
                <Link style={clearDecoration} to='/requests'>
                    <li><p><i className='fas fa-calendar-alt'></i>requests [A]</p></li>
                </Link>
                <li><p><i className='fas fa-user'></i>profile</p></li>
                <li><p><i className='fas fa-sign-out-alt'></i>logout</p></li>
            </ul>
        </div>
    )
}

export default Menu;