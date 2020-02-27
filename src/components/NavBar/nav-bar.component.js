import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

/**
 * Navigation Bar to use at the top of the site on each page
 * @param props
 *  @webId ID of the user
 * @returns {*}
 */
const NavBar = (props) => {
  return (
    <header role="navigation" className="header header__desktop fixed">
      <section className="header-wrap">
        <div className="logo-block">
          <NavLink to="/">
            <img src="/img/inrupt.svg" alt="inrupt" />
          </NavLink>
        </div>
      </section>
      <div>
        <NavLink to="/login" className="link" activeclassname="selected-link">
          Login
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;
