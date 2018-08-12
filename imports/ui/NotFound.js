import React from 'react'
import { Link } from 'react-router-dom';

const NotFound =  () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p>"He's dead Jim."</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NotFound;
