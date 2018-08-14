import React from 'react'
import NavBar from './NavBar';

import UserPostsList from './UserPostList';

const Dashboard = () => {
    return (
        <div>
            <NavBar/>
            <p>Dashboard</p>
            <UserPostsList/>
        </div>
    )
}

export default Dashboard;
