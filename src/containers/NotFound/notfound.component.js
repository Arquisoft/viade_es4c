import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from './error404.jpg'

const NotFoundComponent = () => {
    return <div>
    <img src={PageNotFound} width="70%" height="70%" />
    <p style={{textAlign:"center"}}>
      <Link to="/">Go Back </Link>
    </p>
  </div>;
}

export default NotFoundComponent;
