import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Login } from "../../containers";

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
          <Link to="/">
            <img src="/img/inrupt.svg" alt="inrupt" />
          </Link>
        </div>
      </section>
      <div>
        {webId ? (
          <Fragment>
            <Link to={webId}>Profile</Link>
            <Link to="/friends">Friends</Link>
          </Fragment>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
};

export default NavBar;
