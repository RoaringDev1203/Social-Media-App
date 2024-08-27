import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import Notifications from '../notifications/Notifications';
import './Navbar.css'

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const authLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><a onClick={() => dispatch(logout())} href="#!">Logout</a></li>
        </ul>
    );
    
    const guestLinks = (
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1><Link to="/">Social Media App</Link></h1>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
            <div className="navbar-right">
                <Notifications />
            </div>
        </nav>
    );
};

export default Navbar;
