import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navigation">
      <h1 className="navigation__title">Meteor Blog App</h1>
      <div className="link-container">
          <NavLink className="link-container__link" exact to="/draftpost">New Post</NavLink>
      </div>
    </div>
  )
}

export default NavBar;