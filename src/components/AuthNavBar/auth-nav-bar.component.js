import React from "react";
import { NavLink} from "react-router-dom";
import "./auth-nav-bar.css";
import UploadButton from "./UploadButton";

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
        <UploadButton/>
        <NavLink exact to="/profile" className="link" activeClassName="selected-link">Profile</NavLink>
				<NavLink exact to="/myRoutes" className="link" activeClassName="selected-link">MyRoutes</NavLink>
        <NavLink exact to="/friends" className="link" activeClassName="selected-link">Friends</NavLink>
				<NavLink exact to="/friendsRoutes" className="link" activeClassName="selected-link">FriendsRoutes</NavLink>
        <NavLink exact to="/routesList" className="link" activeClassName="selected-link">RoutesList Example</NavLink>
      </div>
    </header>
  );
};

export default AuthNavBar;
