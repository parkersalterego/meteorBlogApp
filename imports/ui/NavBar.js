import React from 'react'
import history from '../routing/history';

const NavBar = () => {
  return (
    <div className="navigation">
      <h1 onClick={() => history.push('/dashboard')} className="navigation__title">Meteor Blog App</h1>
      <ul className="link-container">
        <li onClick={()=> history.push('/newpost')}>New Post</li>
        <li onClick={() => {
          Meteor.logout(() => {
            history.push('/');
          });
        }}>logout</li>
      </ul>
    </div>
  )
}

export default NavBar;
