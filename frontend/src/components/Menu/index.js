import React from 'react';
import './style.scss';

const Menu = () => {
    return (
        <div className='container-menu'>
            {/* Beginning of exemplary menu. */}
            <h2>attendor-lite</h2>
            <ul>
                <li><a href='www.google.com'><i className='fas fa-home'></i>dashboard</a></li>
                <li><a href='www.google.com'><i className='fas fa-calendar-alt'></i>requests</a></li>
                <li><a href='www.google.com'><i className='fas fa-user'></i>profile</a></li>
                <li><a href='www.google.com'><i className='fas fa-users'></i>groups</a></li>
                <li><a href='www.google.com'><i className='fas fa-wrench'></i>settings</a></li>
                <li><a href='www.google.com#'><i className='fas fa-toolbox'></i>Ipsum</a></li>
                <li><a href='www.google.com'><i className='fas fa-chart-line'></i>Lorem</a></li>
                <li><a href='www.google.com'><i className='fas fa-trash'></i>Ipsum</a></li>
            </ul>
            {/* End of exemplary menu. */}
        </div>
    )
}

export default Menu;