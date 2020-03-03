import React from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./navbar.css";

/**
 * Navigation bar which contains de actions of a user not loggedin
 * @param props
 *  @webId ID of the user
 * @returns {*}
 */
const NavBar = props => {
  return (
    <header role="navigation" className="header header__desktop fixed">
      <section className="header-wrap">
        <div className="logo-block">
          <NavLink to="/">
            <Image src="/img/logo.svg" alt="Viade" />
          </NavLink>
        </div>
      </section>
      <div>
        <NavLink
          to="/register"
          className="link"
          activeclassname="selected-link"
        >
          Sign Up
        </NavLink>
        <NavLink to="/login" className="link" activeclassname="selected-link">
          Log In
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;
