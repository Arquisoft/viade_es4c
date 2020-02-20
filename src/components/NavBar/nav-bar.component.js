import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Login } from "../../containers";
import './navbar.css';

/**
 * Navigation Bar to use at the top of the site on each page
 * @param props
 *  @webId ID of the user
 * @returns {*}
 */
const NavBar = props => {
  const webId = props.webId;

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
        {webId ? (
          <Fragment>
            <NavLink to={webId} className='link' activeClassName="selected-link">Profile</NavLink>
            <NavLink exact to="/friends" className='link' activeClassName="selected-link">Friends</NavLink>
          </Fragment>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
};

export default NavBar;
