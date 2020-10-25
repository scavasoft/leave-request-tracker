import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../reducers/authReducer";
import { createSelector } from 'reselect';

import './style.scss';

// An inline style to clear the text-decoration for the <Link> element.
const clearDecoration = {
    textDecoration: 'none'
}

const selector = createSelector(
    store => store.authReducer.isLoggedIn,
    store => store.authReducer.user,
    (isLoggedIn, user) => ({
        isLoggedIn,
        user,
    })
)
const Menu = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const { isLoggedIn, user } = useSelector(selector);

    const [isAdmin, setAuthority] = useState(false);
    useEffect(() => {
        if (isLoggedIn && user.authority === 'ADMIN')
            setAuthority(true);
    });

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
                <Link to='/' onClick={handleLogout} style={clearDecoration}>
                    <li><p><i className='fas fa-sign-out-alt'></i><span>logout</span></p></li>
                </Link>
            </ul>
        </div>
    )
}

export default Menu;