import React from 'react';
import { NavLink } from 'react-router-dom';
import history from '../routing/history';

const navigateHome = () => {
  history.push('/dashboard');
}

const NavBar = () => {
  return (
    <div className="navigation">
      <h1 onClick={navigateHome} className="navigation__title">Meteor Blog App</h1>
      <div className="link-container">
          <NavLink className="link-container__link" exact to="/newpost">New Post</NavLink>
      </div>
    </div>
  )
}

export default NavBar;