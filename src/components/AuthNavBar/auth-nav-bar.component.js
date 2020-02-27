import React from "react";
import { NavLink,Link } from "react-router-dom";
import "./auth-nav-bar.css";

/**
* Navigation bar which contains de actions of a user loggedin 
*/
const AuthNavBar = (props) => {
  const webId = props.webId;
  return (
    <header role="navigation" className="header header__desktop fixed" id="auth">
      <section className="header-wrap">
        <div className="logo-block">
          <NavLink to="/">
            <img src="/img/inrupt.svg" alt="inrupt" />
          </NavLink>
        </div>
      </section>
      <div>
        <NavLink to={webId} className="link" activeclassname="selected-link">Profile</NavLink>
        <NavLink to="/friends" className="link" activeclassname="selected-link" >Friends</NavLink>
      </div>
    </header>
  );
};

export default AuthNavBar;
