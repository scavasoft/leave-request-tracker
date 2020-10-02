import React from 'react';
import './style.scss'

const Menu = () => {
    return (
        <div className='container-menu'>
            {/* Beginning of exemplary menu. */}
            <h2>Example Menu</h2>
            <ul>
                <li><a href='#'><i className='fas fa-home'></i> Lorem</a></li>
                <li><a href='#'><i className='fas fa-calendar-alt'></i> Ipsum</a></li>
                <li><a href='#'><i className='fas fa-user'></i> Lorem</a></li>
                <li><a href='#'><i className='fas fa-users'></i> Ipsum</a></li>
                <li><a href='#'><i className='fas fa-wrench'></i> Lorem</a></li>
                <li><a href='#'><i className='fas fa-toolbox'></i> Ipsum</a></li>
                <li><a href='#'><i className='fas fa-chart-line'></i> Lorem</a></li>
                <li><a href='#'><i className='fas fa-trash'></i> Ipsum</a></li>
            </ul>
            {/* End of exemplary menu. */}
        </div>
    )
}

export default Menu;