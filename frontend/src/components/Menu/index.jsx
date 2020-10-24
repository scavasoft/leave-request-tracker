import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
import {logout} from "../../reducers/authReducer";

// An inline style to clear the text-decoration for the <Link> element.
const clearDecoration = {
    textDecoration: 'none'
}

const Menu = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    // const isAdmin = useState(false); // boolean to check whether the user has admin privilege (refactor logic)
    // const user = JSON.parse(localStorage.getItem('user'));
    //
    // if(user !== null) {
    //     if (user.authority === 'ADMIN') this.state.isAdmin = true;
    // }

    return (
        <div className='container-menu'>
            <h2>attendor-lite</h2>
            <ul>
                <Link to='/dashboard' style={clearDecoration}>
                    <li><p><i className='fas fa-home'></i>dashboard</p></li>
                </Link>
                <Link to='/requests' style={clearDecoration}>
                    <li><p><i className='fas fa-calendar-alt'></i>requests [A]</p></li>
                </Link>
                <Link to='/' onClick={handleLogout} style={clearDecoration}>
                    <li><p><i className='fas fa-sign-out-alt'></i>logout</p></li>
                </Link>
            </ul>
        </div>
    )
}

export default Menu;