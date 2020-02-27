import React from "react";
import { NavLink } from "react-router-dom";
import "./auth-nav-bar.css";


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
        <NavLink to={webId} className="link" activeClassName="selected-link">Profile</NavLink>
        <NavLink exact to="/friends" className="link" activeClassName="selected-link">Friends</NavLink>
      </div>
    </header>
  );
};

export default AuthNavBar;
