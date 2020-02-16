import React from 'react';
import { Link } from 'react-router-dom';
import Login from "../../Login/login.component";

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
                        <img src="/img/inrupt.svg" alt="inrupt"/>
                    </Link>
                </div>
            </section>
            <div>
                {(webId)?
                    <Link to={webId}>
                        Profile
                    </Link>
                    : <Login />
                }
            </div>
        </header>
    );
};

export default NavBar;