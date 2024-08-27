import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector(state => state.auth.user);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user ? localStorage.username : 'User'}!</p>
            {/* Add more user-specific content here */}
        </div>
    );
};

export default Dashboard;
